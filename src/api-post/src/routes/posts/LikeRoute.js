import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { idValidator } from "../validators.js"

const prepareRoutesLike = ({ app, db }) => {
  const likeData = new Hono()

  const likeSchema = z.object({
    postId: idValidator,
    userId: idValidator.optional()
  })

  likeData.get("/post/liked/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    try {
      const existingLike = await db.table("likes").where({ postId, userId }).first()

      return c.json({ success: true, isLiked: Boolean(existingLike) })
    } catch (error) {
      c.status(500)

      return c.json({ success: false, message: `Error checking like status for post ${postId}: ${error.message}` })
    }
  })

  likeData.get("/post/likes/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId

    try {
      const likeCount = await db.table("likes").where({ postId }).count("* as likeCount")

      return c.json({ success: true, postId, likeCount: likeCount[0].likeCount })
    } catch (error) {
      c.status(500)

      return c.json({ success: false, message: `Error retrieving like count for post ${postId}: ${error.message}` })
    }
  })

  likeData.post("/post/like/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    const existingLike = await db.table("likes").where({ postId, userId }).first()

    if (existingLike) {
      c.status(404)

      return c.json({ success: false, message: "You have already liked this post" })
    }

    await db.table("likes").insert({ postId, userId })

    return c.json({ success: true, message: "Like added to post" })
  })

  likeData.delete("/post/like/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    const existingLike = await db.table("likes").where({ postId, userId }).first()

    if (!existingLike) {
      c.status(404)

      return c.json({ success: false, message: "You have not liked this post" })
    }

    await db.table("likes").where({ postId, userId }).delete()

    return c.json({ success: true, message: "Like removed from post" })
  })

  app.route("/", likeData)
}

export default prepareRoutesLike
