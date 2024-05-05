function fetchFollowedUsersPosts(db, userId, offset = 0, limit = 10) {
  return db
    .table("follows")
    .join("users", "users.id", "=", "follows.followedId")
    .join("posts", "posts.ownerId", "=", "users.id")
    .where("follows.followerId", userId)
    .select(
      "posts.id as postId",
      "posts.createdAt",
      "posts.description",
      "posts.imageUrl",
      "users.username",
      "users.avatarUrl",
    )
    .orderBy("posts.createdAt", "desc")
    .offset(offset)
    .limit(limit)
}

export function subscribedPostsRoutes(app, db) {
  app.get("/post/subscribed/:id", async (c) => {
    const userId = 2 // Hardcoded for now
    const page = parseInt(c.req.query("page")) || 0

    if (page < 0) {
      c.res.statusCode = 400

      return c.json({
        success: false,
        message: "Invalid page number",
      })
    }

    try {
      const posts = await fetchFollowedUsersPosts(db, userId, page * 10, 10)

      c.res.statusCode = 200

      return c.json({
        success: true,
        data: posts,
        hasMore: posts.length > 0,
      })
    } catch (error) {
      c.res.statusCode = 500

      return c.json({
        success: false,
        message: "An error occurred while fetching the posts",
      })
    }
  })
}
