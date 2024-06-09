import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { idValidator } from "./validators.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"
import LikeModel from "../db/models/LikeModel.js"

const prepareRoutesLike = ({ app }) => {
  const likeData = new Hono()

  const likeSchema = z.object({
    postId: idValidator,
    userId: idValidator.optional()
  })

  likeData.get("/post/liked/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    try {
      const existingLike = await LikeModel.query().where({ postId, userId }).first()

      return c.json({ success: true, isLiked: Boolean(existingLike) }, HTTP_STATUS_CODES.OK)
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.LIKE_STATUS_ERROR} ${postId}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  likeData.get("/post/likes/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId

    try {
      const likeCount = await LikeModel.query().where({ postId }).count("* as likeCount")

      return c.json(
        {
          success: true,
          postId,
          likeCount: likeCount[0].likeCount
        },
        HTTP_STATUS_CODES.OK
      )
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.RETRIEVE_LIKE_COUNT_ERROR} ${postId}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  likeData.post("/post/like/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    try {
      const existingLike = await LikeModel.query().where({ postId, userId }).first()

      if (existingLike) {
        return c.json(
          {
            success: false,
            message: HTTP_ERRORS.ALREADY_LIKED
          },
          HTTP_STATUS_CODES.NOT_FOUND
        )
      }

      await LikeModel.query().insert({ postId, userId })

      return c.json(
        {
          success: true,
          message: HTTP_ERRORS.LIKE_ADDED
        },
        HTTP_STATUS_CODES.OK
      )
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.LIKE_STATUS_ERROR} ${postId}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  likeData.delete("/post/like/:postId/:userId", zValidator("param", likeSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    try {
      const existingLike = await LikeModel.query().where({ postId, userId }).first()

      if (!existingLike) {
        return c.json(
          {
            success: false,
            message: HTTP_ERRORS.NOT_LIKED
          },
          HTTP_STATUS_CODES.NOT_FOUND
        )
      }

      await LikeModel.query().where({ postId, userId }).delete()

      return c.json(
        {
          success: true,
          message: HTTP_ERRORS.LIKE_REMOVED
        },
        HTTP_STATUS_CODES.OK
      )
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.LIKE_STATUS_ERROR} ${postId}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  app.route("/", likeData)
}

export default prepareRoutesLike
