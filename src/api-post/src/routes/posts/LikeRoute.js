import { z } from "zod"

export function likeRoutes(app, db) {
  app.get("/post/liked/:postId", async (c) => {
    const postId = z
      .number()
      .int()
      .positive()
      .parse(parseInt(c.req.param("postId")))

    // Hardcoded for now
    const userId = 1

    try {
      const existingLike = await db
        .table("likes")
        .where({
          postId: postId,
          userId: userId,
        })
        .first()

      return c.json({
        success: true,
        isLiked: Boolean(existingLike),
      })
    } catch (error) {
      c.status(500)

      return c.json({
        success: false,
        message: `Error checking like status for post ${postId}: ${error.message}`,
      })
    }
  })

  app.get("/post/likes/:postId", async (c) => {
    const postId = z
      .number()
      .int()
      .positive()
      .parse(parseInt(c.req.param("postId")))

    try {
      const likeCount = await db
        .table("likes")
        .where({ postId: postId })
        .count("* as likeCount")

      return c.json({
        success: true,
        postId: postId,
        likeCount: likeCount[0].likeCount,
      })
    } catch (error) {
      c.status(500)

      return c.json({
        success: false,
        message: `Error retrieving like count for post ${postId}: ${error.message}`,
      })
    }
  })

  app.post("/post/like/:postId", async (c) => {
    const postId = z
      .number()
      .int()
      .positive()
      .parse(parseInt(c.req.param("postId")))

    // Hardcoded for now
    const userId = 1

    const existingLike = await db
      .table("likes")
      .where({
        postId: postId,
        userId: userId,
      })
      .first()

    if (existingLike) {
      c.status(404)

      return c.json({
        success: false,
        message: `You have already liked this post`,
      })
    }

    await db.table("likes").insert({
      postId: postId,
      userId: userId,
    })

    return c.json({
      success: true,
      message: `Like added to post`,
    })
  })

  app.delete("/post/like/:postId", async (c) => {
    const postId = z
      .number()
      .int()
      .positive()
      .parse(parseInt(c.req.param("postId")))

    // Hardcoded for now
    const userId = 1

    const existingLike = await db
      .table("likes")
      .where({
        postId: postId,
        userId: userId,
      })
      .first()

    if (!existingLike) {
      c.status(404)

      return c.json({
        success: false,
        message: `You have not liked this post`,
      })
    }

    await db
      .table("likes")
      .where({
        postId: postId,
        userId: userId,
      })
      .delete()

    return c.json({
      success: true,
      message: `Like removed from post`,
    })
  })
}
