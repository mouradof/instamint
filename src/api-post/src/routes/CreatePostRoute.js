import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import PostModel from "../db/models/PostModel.js"
import { booleanValidator, stringValidator } from "./validators.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"
import { uploadImageToAzure } from "../services/azure-uploader.js"

const fileTypeValidator = z.enum(["image/png", "image/webp", "audio/ogg", "audio/flac", "video/h264"])
const fileSizeValidator = z.number().min(1).max(1_000_000_000)

const prepareRoutesPost = ({ app }) => {
  const postData = new Hono()

  const postSchema = z.object({
    description: stringValidator,
    mediaData: z
      .object({
        name: stringValidator.optional(),
        size: fileSizeValidator.optional(),
        type: fileTypeValidator.optional(),
        path: stringValidator.optional()
      })
      .optional(),
    termsAccepted: booleanValidator.optional(),
    isDraft: booleanValidator.optional(),
    location: stringValidator.optional(),
    hashtags: stringValidator.optional()
  })

  postData.post("/posts/:userId", zValidator("form", postSchema), async c => {
    const userId = c.req.param("userId")
    const body = await c.req.parseBody({ all: true })
    const { description, mediaData, termsAccepted, isDraft, location, hashtags } = body

    let mediaUrl = null

    try {
      if (mediaData) {
        if (mediaData instanceof File) {
          const arrayBuffer = await mediaData.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          mediaUrl = await uploadImageToAzure(
            buffer.toString("base64"),
            mediaData.name,
            process.env.AZURE_ACCOUNT_NAME,
            process.env.AZURE_ACCOUNT_KEY,
            process.env.AZURE_CONTAINER_NAME
          )
        } else {
          return c.json({
            success: false,
            message: HTTP_ERRORS.UNSUPPORTED_FILE_FORMAT
          })
        }
      }

      const newPost = await PostModel.query().insert({
        ownerId: userId,
        description,
        mediaData: mediaUrl,
        termsAccepted,
        isDraft: isDraft || false,
        location,
        hashtags
      })

      return c.json(
        {
          success: true,
          message: HTTP_ERRORS.POST_CREATED_SUCCESS,
          postId: newPost.id
        },
        HTTP_STATUS_CODES.CREATED
      )
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.CREATE_POST_FAILED}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  app.route("/", postData)
}

export default prepareRoutesPost
