import { Hono } from "hono"
import TeabagModel from "../db/models/TeabagModel.js"
import PostModel from "../db/models/PostModel.js"
import GroupMemberModel from "../db/models/GroupMemberModel.js"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { idValidator } from "../validators.js"
import pkg from "../../configAWS.cjs"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"

const IPFS_BASE_URL = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye"
const DEFAULT_AVATAR_URL = `${IPFS_BASE_URL}/avatar`

const prepareRoutesTeabagById = ({ app }) => {
  const teabagData = new Hono()

  const teabagIdSchema = z.object({
    teabagId: idValidator
  })

  teabagData.get("/teabag/:teabagId", zValidator("param", teabagIdSchema), async c => {
    try {
      const teabagId = c.req.valid("param").teabagId
      const teabag = await TeabagModel.query().findById(teabagId)

      if (!teabag) {
        c.status(HTTP_STATUS_CODES.NOT_FOUND)

        return c.json({
          success: false,
          message: HTTP_ERRORS.NOT_FOUND
        })
      }

      const userCount = await GroupMemberModel.query().where("teabagId", teabag.id).count("userId as userCount").first()
      teabag.userCount = userCount.userCount || 0

      const posts = await PostModel.query().where("teabagId", teabag.id)

      if (teabag.image && !teabag.image.startsWith(DEFAULT_AVATAR_URL)) {
        teabag.imageBucket = pkg.getSignedUrl("getObject", {
          Bucket: process.env.BUCKET_NAME_S3,
          Key: teabag.image
        })
      } else {
        teabag.imageBucket = teabag.image
      }

      c.status(HTTP_STATUS_CODES.OK)

      return c.json({
        result: {
          name: teabag.name,
          image: teabag.imageBucket,
          userCount: teabag.userCount,
          posts: posts
        },
        success: true,
        message: HTTP_ERRORS.OK
      })
    } catch (error) {
      c.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)

      return c.json({
        result: error,
        success: false,
        message: `${HTTP_ERRORS.INTERNAL_SERVER_ERROR}: ${error.message}`
      })
    }
  })

  app.route("/", teabagData)
}

export default prepareRoutesTeabagById
