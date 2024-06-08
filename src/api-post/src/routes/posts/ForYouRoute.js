import { Hono } from "hono"
import { z } from "zod"
import { idValidator, stringValidator } from "../validators.js"
import { zValidator } from "@hono/zod-validator"
import FollowModel from "../../db/models/FollowModel.js"
import PostModel from "../../db/models/PostModel.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../../errors.js"

const prepareRoutesForYou = ({ app }) => {
  const forYouData = new Hono()

  const idForYouSchema = z.object({
    id: idValidator
  })
  const pageForYouSchema = z.object({
    page: stringValidator
  })

  forYouData.get(
    "/post/for-you/:id",
    zValidator("param", idForYouSchema),
    zValidator("query", pageForYouSchema),
    async c => {
      try {
        const userId = c.req.valid("param").id
        const page = parseInt(c.req.valid("query").page, 10) || 0

        if (page < 0) {
          return c.json(
            {
              success: false,
              message: HTTP_ERRORS.INVALID_PAGE_NUMBER
            },
            HTTP_STATUS_CODES.BAD_REQUEST
          )
        }

        const directFollows = await FollowModel.query().where("followerId", userId)
        const followedIds = directFollows.map(user => user.followedId)
        const indirectFollows = await FollowModel.query().whereIn("followerId", followedIds)
        const allFollowedIds = [...followedIds, ...indirectFollows.map(user => user.followedId), userId]

        const allPosts = await PostModel.query()
          .whereIn("ownerId", allFollowedIds)
          .where("isDraft", false)
          .join("users", "posts.ownerId", "=", "users.id")
          .select("posts.*", "users.username", "users.profileImage")
          .orderBy("posts.createdAt", "desc")
          .limit(10 * (page + 1))

        const formattedPosts = allPosts.map(post => ({
          postId: post.id,
          ownerId: post.ownerId,
          profileImage: post.profileImage,
          createdAt: post.createdAt,
          description: post.description,
          mediaData: post.mediaData,
          location: post.location,
          hashtags: post.hashtags,
          username: post.username,
          userId: post.userId
        }))

        return c.json(
          {
            success: true,
            result: formattedPosts,
            hasMore: allPosts.length > 10 * (page + 1)
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

  app.route("/", forYouData)
}

export default prepareRoutesForYou
