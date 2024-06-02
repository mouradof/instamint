import { Hono } from "hono"
import PostModel from "../db/models/PostModel.js"
import CommentModel from "../db/models/CommentModel.js"
import BaseModel from "../db/models/BaseModel.js"
import knex from "knex"
import config from "../../config.js"

const db = knex(config.db)
BaseModel.knex(db) // Lier l'instance de Knex ici également

const postRoutes = new Hono()

postRoutes.options("/user/:id", c => {
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  c.header("Access-Control-Allow-Headers", "authorization, content-type")

  return c
})

postRoutes.get("/user/:id", async c => {
  const id = parseInt(c.req.param("id"), 10)

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

postRoutes.get("/:postId/comments", async c => {
  const postId = parseInt(c.req.param("postId"), 10)

  if (!postId) {
    return c.json({ error: "Post ID is required" }, 400)
  }

  try {
    const comments = await CommentModel.query()
      .where({ postId })
      .join("users", "comments.userId", "users.id")
      .select("comments.*", "users.username", "users.profileImage")

    return c.json(comments)
  } catch (error) {
    return c.json({ error: "Failed to fetch comments", details: error.message }, 500)
  }
})

postRoutes.post("/:postId/comments", async c => {
  const postId = parseInt(c.req.param("postId"), 10)

  let commentData

  try {
    commentData = await c.req.json()
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400)
  }

  const { userId, content } = commentData

  if (!postId || !userId || !content) {
    return c.json({ error: "Post ID, User ID, and content are required" }, 400)
  }

  try {
    const newComment = await CommentModel.query().insert({
      postId,
      userId,
      content
    })

    // Récupérer les informations de l'utilisateur pour le nouveau commentaire
    const addedComment = await CommentModel.query()
      .where("comments.id", newComment.id)
      .join("users", "comments.userId", "users.id")
      .select("comments.*", "users.username", "users.profileImage")
      .first()

    return c.json(addedComment, 200)
  } catch (error) {
    return c.json({ error: "Failed to add comment", details: error.message }, 500)
  }
})

export default postRoutes
