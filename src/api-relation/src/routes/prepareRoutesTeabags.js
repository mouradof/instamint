import { Hono } from "hono"
import TeabagModel from "../db/models/TeabagModel.js"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { idValidator } from "../validators.js"

const prepareRoutesTeabags = ({ app }) => {
  const teabagsData = new Hono()

  const teabagSchema = z.object({
    userId: idValidator,
  })
  // I GUESS WE WILL GET USERID FROM JWT BUT ATM I AM DOING IT WITHOUT TOKEN
  teabagsData.get("/teabags/:userId",
    zValidator("param", teabagSchema),
    async (c) => {
      try {
        const userId = c.req.valid("param").userId
        const teabagsData = await TeabagModel.query().where("ownerId", userId)
        c.status(200)

        return c.json({
          success: true,
          ...teabagsData,
          message: `done`,
        })
      } catch (error) {
        c.status(500).send({ error: "Internal server error" })
      }
    }
  )

  app.route("/", teabagsData)
}

export default prepareRoutesTeabags
