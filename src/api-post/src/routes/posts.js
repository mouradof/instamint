import { Hono } from "hono"
import PostModel from "../db/models/PostModel.js"
import CommentModel from "../db/models/CommentModel.js"
import BaseModel from "../db/models/BaseModel.js"
import knex from "knex"
import config from "../../config.js"

const db = knex(config.db)
BaseModel.knex(db)

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

postRoutes.put("/:postId/comments/:commentId", async c => {
  const postId = parseInt(c.req.param("postId"), 10)
  const commentId = parseInt(c.req.param("commentId"), 10)

  let commentData

  try {
    commentData = await c.req.json()
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400)
  }

  const { userId, content } = commentData

  if (!postId || !commentId || !userId || !content) {
    return c.json({ error: "Post ID, Comment ID, User ID, and content are required" }, 400)
  }

  try {
    const updatedComment = await CommentModel.query()
      .where({ id: commentId, userId, postId })
      .update({ content, updatedAt: db.fn.now() })
      .returning("*")

    if (updatedComment.length === 0) {
      return c.json({ error: "Comment not found or not authorized" }, 404)
    }

    return c.json(updatedComment[0], 200)
  } catch (error) {
    return c.json({ error: "Failed to update comment", details: error.message }, 500)
  }
})

postRoutes.delete("/:postId/comments/:commentId", async c => {
  const postId = parseInt(c.req.param("postId"), 10)
  const commentId = parseInt(c.req.param("commentId"), 10)

  let commentData

  try {
    commentData = await c.req.json()
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400)
  }

  const { userId } = commentData

  if (!postId || !commentId || !userId) {
    return c.json({ error: "Post ID, Comment ID, and User ID are required" }, 400)
  }

  try {
    const deletedComment = await CommentModel.query().where({ id: commentId, userId }).delete()

    if (!deletedComment) {
      return c.json({ error: "Comment not found or not authorized" }, 404)
    }

    return c.json({ success: true, message: "Comment deleted successfully" }, 200)
  } catch (error) {
    return c.json({ error: "Failed to delete comment", details: error.message }, 500)
  }
})

export default postRoutes
