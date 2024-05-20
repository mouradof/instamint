import { Hono } from "hono"
import { z } from "zod"
import { idValidator, stringValidator } from "../validators.js"
import { zValidator } from "@hono/zod-validator"
import { HTTP_STATUS_CODES } from "../../errors.js"
import ReportModel from "../../db/models/ReportModel.js"

const prepareRoutesReport = ({ app }) => {
  const reportData = new Hono()

  const reportSchema = z.object({
    postId: idValidator,
    userId: idValidator,
    reason: stringValidator.optional()
  })

  reportData.post(
    "/post/report/:postId/:userId",
    zValidator("param", reportSchema.pick({ postId: true, userId: true })),
    zValidator("json", reportSchema.pick({ reason: true })),
    async c => {
      const postId = c.req.valid("param").postId
      const userId = c.req.valid("param").userId
      const reason = c.req.valid("json").reason

      try {
        const existingReport = await ReportModel.query().where({ postId, userId }).first()

        if (existingReport) {
          await ReportModel.query().where({ postId, userId }).update({ reason })
        } else {
          await ReportModel.query().insert({ postId, userId, reason })
        }

        return c.json(
          {
            success: true,
            message: "Report submitted successfully"
          },
          HTTP_STATUS_CODES.OK
        )
      } catch (error) {
        return c.json(
          {
            success: false,
            message: `Failed to submit report: ${error.message}`
          },
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        )
      }
    }
  )

  app.route("/", reportData)
}

export default prepareRoutesReport
