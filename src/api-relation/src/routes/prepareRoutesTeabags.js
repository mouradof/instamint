import { Hono } from "hono"
import GroupMemberModel from "../db/models/GroupMemberModel.js"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { idValidator } from "../validators.js"
import TeabagModel from "../db/models/TeabagModel.js"
import pkg from "../../configAWS.cjs"

const prepareRoutesTeabags = ({ app }) => {
  const teabagsData = new Hono()

  const teabagSchema = z.object({
    userId: idValidator
  })
  teabagsData.get("/teabags/:userId", zValidator("param", teabagSchema), async c => {
    try {
      const userId = c.req.valid("param").userId
      const groupMemberships = await GroupMemberModel.query().where("userId", userId)

      if (!groupMemberships) {
        c.status(404)

        return c.json({
          success: false,
          message: "User has no group"
        })
      }

      const teabagIds = groupMemberships.map(group => group.teabagId)

      if (!teabagIds) {
        c.status(404)

        return c.json({
          success: false,
          message: "404 Not found"
        })
      }

      const teabagsData = await TeabagModel.query().findByIds(teabagIds)

      if (!teabagsData) {
        c.status(404)

        return c.json({
          success: false,
          message: "404 Not found"
        })
      }

      for (const teabag of teabagsData) {
        const userCount = await GroupMemberModel.query()
          .where("teabagId", teabag.id)
          .count("userId as userCount")
          .first()
        teabag.userCount = userCount.userCount || 0

        if (
          teabag.image &&
          !teabag.image.startsWith(
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar"
          )
        ) {
          teabag.imageBucket = pkg.getSignedUrl("getObject", {
            Bucket: process.env.BUCKET_NAME_S3,
            Key: teabag.image
          })
        } else {
          teabag.imageBucket = teabag.image
        }
      }

      c.status(200)

      return c.json({
        result: teabagsData,
        success: true,
        message: "Data fetched"
      })
    } catch (error) {
      c.status(500)

      return c.json({
        result: error,
        success: false,
        message: `INTERNAL SERVER ERROR: ${error}`
      })
    }
  })

  app.route("/", teabagsData)
}

export default prepareRoutesTeabags
