import { Hono } from "hono"
import { z } from "zod"
import { idValidator } from "./validators.js"
import { zValidator } from "@hono/zod-validator"
import PostModel from "../db/models/PostModel.js"
import { HTTP_STATUS_CODES, HTTP_ERRORS } from "../errors.js"

const prepareRoutesDeletePost = ({ app }) => {
  const DeletePostData = new Hono()

  const postDeleteSchema = z.object({
    postId: idValidator,
    userId: idValidator
  })

  DeletePostData.delete("/post/:postId/:userId", zValidator("param", postDeleteSchema), async c => {
    const postId = c.req.valid("param").postId
    const userId = c.req.valid("param").userId

    try {
      const post = await PostModel.query().where({ id: postId, ownerId: userId }).first()

      if (!post) {
        return c.json(
          {
            success: false,
            message: HTTP_ERRORS.NOT_AUTHORIZED_OR_NOT_FOUND
          },
          HTTP_STATUS_CODES.NOT_FOUND
        )
      }

      await PostModel.query().where({ id: postId, ownerId: userId }).delete()

      return c.json(
        {
          success: true,
          message: HTTP_ERRORS.POST_DELETED
        },
        HTTP_STATUS_CODES.OK
      )
    } catch (error) {
      return c.json(
        {
          success: false,
          message: `${HTTP_ERRORS.DELETE_POST_FAILED}: ${error.message}`
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      )
    }
  })

  app.route("/", DeletePostData)
}

export default prepareRoutesDeletePost
