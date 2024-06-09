import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import PostModel from "../db/models/PostModel.js"
import { stringValidator } from "./validators.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"
import pkg from "../../configAWS.cjs"
import { v4 as uuidv4 } from "uuid"

const generateUniqueFileName = originalFileName => {
  const uniqueId = uuidv4()
  const fileExtension = originalFileName.split(".").pop()

  return `${uniqueId}.${fileExtension}`
}

const fileTypeValidator = z.enum(["image/png", "image/webp", "audio/ogg", "audio/flac", "video/h264"])
const fileSizeValidator = z.number().min(1).max(1_000_000_000)

const prepareRoutesPost = ({ app }) => {
  const postData = new Hono()

  const mediaDataSchema = z
    .object({
      name: stringValidator,
      size: fileSizeValidator,
      type: fileTypeValidator
    })
    .nullable()
    .optional()

  const postSchema = z.object({
    description: stringValidator.optional(),
    mediaData: mediaDataSchema,
    useDefaultImages: stringValidator.optional(),
    isDraft: stringValidator,
    location: stringValidator.optional(),
    hashtags: stringValidator.optional()
  })

  postData.post("/post/:userId", zValidator("form", postSchema), async c => {
    const userId = c.req.param("userId")
    const body = await c.req.parseBody({ all: true })
    const { description, mediaData, useDefaultImages, location, hashtags } = body
    const isDraft = body.isDraft === "true"

    try {
      let mediaUrl

      if (useDefaultImages === "true") {
        mediaUrl = "/images/default-post-image.jpg"
      } else if (mediaData && mediaData.name) {
        const uniqueMediaName = generateUniqueFileName(mediaData.name)
        const mediaBuffer = Buffer.from(await mediaData.arrayBuffer())
        const mediaParams = {
          Bucket: process.env.BUCKET_NAME_S3,
          Key: uniqueMediaName,
          Body: mediaBuffer,
          ContentType: mediaData.type
        }
        await pkg.upload(mediaParams).promise()
        mediaUrl = `https://${process.env.BUCKET_NAME_S3}.s3.amazonaws.com/${uniqueMediaName}`
      } else {
        mediaUrl = null
      }

      const newPost = await PostModel.query().insert({
        ownerId: userId,
        description: description || "",
        mediaData: mediaUrl,
        isDraft,
        location: location || null,
        hashtags: hashtags || null
      })

      return c.json(
        {
          success: true,
          message: `${HTTP_ERRORS.CREATE_POST_SUCCESS}: ${newPost.id}`,
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
