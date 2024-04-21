import { Hono } from "hono"
import PostModel from "../../db/models/PostModel.js"

const fetchForYou = new Hono()

fetchForYou.get("/post/for-you/:id", async (c) => {
  const userId = c.req.param("id")

  try {
    const posts = await PostModel.query().where("ownerId", userId)

    return c.json({
      success: true,
      data: posts,
    })
  } catch (error) {
    return c.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

export default fetchForYou
