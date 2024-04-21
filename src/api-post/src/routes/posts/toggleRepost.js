import { Hono } from "hono"
import knex from "knex"

const toggleRepost = new Hono()

toggleRepost.all("/post/repost/:postId", async (c) => {
  const postId = c.req.param("postId")
  const userId = c.req.param("userId")

  const existingRepost = await knex("reposts")
    .where({
      postId: postId,
      userId: userId,
    })
    .first()

  try {
    if (existingRepost) {
      await knex("reposts")
        .where({
          postId: postId,
          userId: userId,
        })
        .delete()

      return c.json({
        success: true,
        message: "Repost removed",
      })
    } else {
      await knex("reposts").insert({
        postId: postId,
        userId: userId,
      })

      return c.json({
        success: true,
        message: "Repost added",
      })
    }
  } catch (error) {
    return c.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    })
  }
})

export default toggleRepost
