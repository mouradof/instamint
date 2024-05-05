function fetchForyouPosts(db, userId, offset = 0, limit = 10) {
  const directPosts = db
    .table("follows")
    .join("posts", "posts.ownerId", "=", "follows.followedId")
    .join("users", "users.id", "=", "posts.ownerId")
    .where("follows.followerId", userId)
    .select(
      "posts.id as postId",
      "posts.createdAt",
      "posts.description",
      "posts.imageUrl",
      "users.username",
      "users.avatarUrl",
    )

  const indirectPosts = db
    .table("follows as f1")
    .join("follows as f2", "f2.followerId", "=", "f1.followedId")
    .join("posts", "posts.ownerId", "=", "f2.followedId")
    .join("users", "users.id", "=", "posts.ownerId")
    .where("f1.followerId", userId)
    .select(
      "posts.id as postId",
      "posts.createdAt",
      "posts.description",
      "posts.imageUrl",
      "users.username",
      "users.avatarUrl",
    )

  return db
    .union([directPosts, indirectPosts], true)
    .orderBy("createdAt", "desc")
    .offset(offset)
    .limit(limit)
}

export function forYouPostsRoutes(app, db) {
  app.get("/post/for-you/:id", async (c) => {
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
      const posts = await fetchForyouPosts(db, userId, page * 10, 10)

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
