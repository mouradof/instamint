import { Hono } from "hono"
import { z } from "zod"
import { idValidator, stringValidator } from "../validators.js"
import { zValidator } from "@hono/zod-validator"
import FollowModel from "../../db/models/FollowModel.js"
import PostModel from "../../db/models/PostModel.js"

const prepareRoutesSubscribed = ({ app }) => {
  const subscribedData = new Hono()

  const idSubscribedSchema = z.object({
    id: idValidator
  })
  const pageSubscribedSchema = z.object({
    page: stringValidator
  })

  subscribedData.get(
    "/post/subscribed/:id",
    zValidator("param", idSubscribedSchema),
    zValidator("query", pageSubscribedSchema),
    async c => {
      try {
        const userId = c.req.valid("param").id
        const page = parseInt(c.req.valid("query").page) || 0

        if (page < 0) {
          c.status(400)

          return c.json({
            success: false,
            message: "Invalid page number"
          })
        }

        const followedUsers = await FollowModel.query().where("followerId", userId)

        if (followedUsers.length === 0) {
          c.status(404)

          return c.json({
            success: false,
            message: "No followed users"
          })
        }

        const followedIds = followedUsers.map(user => user.followedId)

        if (followedIds.length === 0) {
          c.status(404)

          return c.json({
            success: false,
            message: "No followed ids"
          })
        }

        const followedPosts = await PostModel.query()
          .whereIn("ownerId", followedIds)
          .join("users", "posts.ownerId", "=", "users.id")
          .select(
            "posts.id as postId",
            "posts.createdAt",
            "posts.description",
            "posts.imageUrl",
            "users.username",
            "users.profileImage"
          )
          .orderBy("posts.createdAt", "desc")

        if (followedPosts.length === 0) {
          c.status(404)

          return c.json({
            success: false,
            message: "No followed posts"
          })
        }

        c.status(200)

        return c.json({
          success: true,
          result: followedPosts,
          hasMore: followedPosts.length > 10
        })
      } catch (error) {
        c.status(500)

        return c.json({
          success: false,
          message: `Failed to fetch posts: ${error}`
        })
      }
    }
  )

  app.route("/", subscribedData)
}

export default prepareRoutesSubscribed
