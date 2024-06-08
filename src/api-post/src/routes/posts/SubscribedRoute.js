import { Hono } from "hono"
import { z } from "zod"
import { idValidator, stringValidator } from "../validators.js"
import { zValidator } from "@hono/zod-validator"
import FollowModel from "../../db/models/FollowModel.js"
import PostModel from "../../db/models/PostModel.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../../errors.js"

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
        const page = parseInt(c.req.valid("query").page, 10) || 0

        if (page < 0) {
          return c.json({ success: false, message: HTTP_ERRORS.INVALID_PAGE_NUMBER }, HTTP_STATUS_CODES.BAD_REQUEST)
        }

        const followedUsers = await FollowModel.query().where("followerId", userId)

        if (followedUsers.length === 0) {
          return c.json({ success: false, message: HTTP_ERRORS.NO_FOLLOWED_USERS }, HTTP_STATUS_CODES.NOT_FOUND)
        }

        const followedIds = followedUsers.map(user => user.followedId)

        if (followedIds.length === 0) {
          return c.json({ success: false, message: HTTP_ERRORS.NO_FOLLOWED_IDS }, HTTP_STATUS_CODES.NOT_FOUND)
        }

        const followedPosts = await PostModel.query()
          .whereIn("ownerId", followedIds.concat(userId))
          .where("isDraft", false)
          .join("users", "posts.ownerId", "=", "users.id")
          .select(
            "posts.id as postId",
            "posts.createdAt",
            "posts.description",
            "posts.mediaData",
            "posts.location",
            "posts.hashtags",
            "posts.ownerId",
            "users.username",
            "users.profileImage"
          )
          .orderBy("posts.createdAt", "desc")

        if (followedPosts.length === 0) {
          return c.json({ success: false, message: HTTP_ERRORS.NO_FOLLOWED_POSTS }, HTTP_STATUS_CODES.NOT_FOUND)
        }

        return c.json(
          {
            success: true,
            result: followedPosts,
            hasMore: followedPosts.length > 10
          },
          HTTP_STATUS_CODES.OK
        )
      } catch (error) {
        return c.json(
          {
            success: false,
            message: `${HTTP_ERRORS.FETCH_POSTS_FAILED}: ${error.message}`
          },
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        )
      }
    }
  )

  app.route("/", subscribedData)
}

export default prepareRoutesSubscribed
