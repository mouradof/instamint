import { Hono } from "hono"
import PostModel from "../db/models/PostModel.js"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { idValidator } from "../validators.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"

const prepareRoutesTeabagPosts = ({ app }) => {
  const teabagPosts = new Hono()

  const teabagIdSchema = z.object({
    teabagId: idValidator
  })

  teabagPosts.get("/teabag/:teabagId/posts", zValidator("param", teabagIdSchema), async c => {
    try {
      const teabagId = c.req.valid("param").teabagId
      const page = parseInt(c.req.query("page")) || 0
      const limit = 10
      const offset = page * limit

      const posts = await PostModel.query()
        .where("teabagId", teabagId)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset)

      const hasMore = posts.length === limit

      c.status(HTTP_STATUS_CODES.OK)

      return c.json({
        result: posts,
        hasMore,
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

  app.route("/", teabagPosts)
}

export default prepareRoutesTeabagPosts
