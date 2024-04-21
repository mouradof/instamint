import { Hono } from "hono"
import knex from "knex"

const toggleLike = new Hono()

toggleLike.all("/post/like/:postId", async (c) => {
  const postId = c.req.param("postId")
  const userId = c.req.param("userId")

  const existingLike = await knex("likes")
    .where({
      postId: postId,
      userId: userId,
    })
    .first()

  try {
    if (existingLike) {
      await knex("likes")
        .where({
          postId: postId,
          userId: userId,
        })
        .delete()

      return c.json({
        success: true,
        message: "Like removed",
      })
    } else {
      await knex("likes").insert({
        postId: postId,
        userId: userId,
      })

      return c.json({
        success: true,
        message: "Like added",
      })
    }
  } catch (error) {
    return c.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    })
  }
})

export default toggleLike
