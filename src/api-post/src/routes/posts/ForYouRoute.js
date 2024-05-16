import { Hono } from "hono"
import { z } from "zod"
import { idValidator, stringValidator } from "../validators.js"
import { zValidator } from "@hono/zod-validator"
import FollowModel from "../../db/models/FollowModel.js"
import PostModel from "../../db/models/PostModel.js"

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
          c.status(400)

          return c.json({
            success: false,
            message: "Invalid page number"
          })
        }

        const directFollows = await FollowModel.query().where("followerId", userId)
        const followedIds = directFollows.map(user => user.followedId)
        const indirectFollows = await FollowModel.query().whereIn("followerId", followedIds)
        const allFollowedIds = [...followedIds, ...indirectFollows.map(user => user.followedId)]

        const allPosts = await PostModel.query()
          .whereIn("ownerId", allFollowedIds)
          .join("users", "posts.ownerId", "=", "users.id")
          .select("posts.*", "users.username", "users.profileImage")
          .limit(10 * (page + 1))

        const formattedPosts = allPosts.map(post => ({
          postId: post.id,
          ownerId: post.ownerId,
          profileImage: post.profileImage,
          createdAt: post.createdAt,
          description: post.description,
          imageUrl: post.imageUrl,
          username: post.username,
          userId: post.userId
        }))

        c.status(200)

        return c.json({
          success: true,
          result: formattedPosts,
          hasMore: allPosts.length > 10 * (page + 1)
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

  app.route("/", forYouData)
}

export default prepareRoutesForYou
