// api-relation/src/routes/prepareRoutesTeabags.js

import { Hono } from "hono"
import GroupMemberModel from "../db/models/GroupMemberModel.js"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { idValidator } from "../validators.js"
import TeabagModel from "../db/models/TeabagModel.js"

const prepareRoutesTeabags = ({ app }) => {
  const teabagsData = new Hono()

  const teabagSchema = z.object({
    userId: idValidator,
  })

  teabagsData.get("/:userId/teabags",
    zValidator("param", teabagSchema),
    async (c) => {
      try {
        const userId = c.req.valid("param").userId
        const groupMemberships = await GroupMemberModel.query().where("userId", userId)
        const teabagIds = groupMemberships.map(group => group.teabagId)
        const teabagsData = await TeabagModel.query().findByIds(teabagIds)
        c.status(200)
                
        return c.json({
          result: teabagsData,
          success: true,
          message: `Data fetched`,
        })
      } catch (error) {
        c.status(500).send({ error: "Internal server error" })
      }
    }
  )

  app.route("/", teabagsData)
}

export default prepareRoutesTeabags
