import { Hono } from "hono"
import PostModel from "../db/models/PostModel.js"

const postRoutes = new Hono()

postRoutes.options("/user/:id", c => {
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  c.header("Access-Control-Allow-Headers", "authorization, content-type")

  return c
})

postRoutes.get("/user/:id", async c => {
  const id = c.req.param("id")

  if (!id) {
    return c.json({ error: "User ID is required" }, 400)
  }

  try {
    const posts = await PostModel.query().where({ ownerId: id })

    return c.json(posts)
  } catch (error) {
    return c.json({ error: "Failed to fetch user posts" }, 500)
  }
})

export default postRoutes
