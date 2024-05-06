import { Hono } from "hono"
import pkg from "../../configAWS.cjs"
import UserModel from "../db/models/UserModel.js"
import TeabagModel from "../db/models/TeabagModel.js"
import GroupMemberModel from "../db/models/GroupMemberModel.js"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { booleanValidator, numberValidator, stringValidator } from "../validators.js"

const generateUniqueFileName = originalFileName => {
  const uniqueId = uuidv4()
  const fileExtension = originalFileName.split(".").pop()

  return `${uniqueId}.${fileExtension}`
}

const prepareRoutesCreateTeabag = ({ app }) => {
  const createTeabag = new Hono()

  const teabagSchema = z.object({
    name: stringValidator,
    description: stringValidator.optional(),
    isPrivate: booleanValidator.optional(),
    userEmails: z.array(stringValidator).optional(),
    image: z
      .object({
        name: stringValidator,
        lastModified: numberValidator,
        size: numberValidator,
        type: stringValidator
      })
      .optional()
  })

  createTeabag.post("teabags/:userId/createTeabag", zValidator("form", teabagSchema), async c => {
    try {
      const userId = c.req.param("userId")
      const userExists = await UserModel.query().findById(userId)

      if (!userExists) {
        c.status(404)

        return c.json({
          success: false,
          message: "User not found"
        })
      }

      const body = await c.req.parseBody({ all: true })
      const { image, name, description, isPrivate, invitedEmailsUsers } = body

      const invitedEmails = JSON.parse(invitedEmailsUsers)
      let uniqueImagename = null

      if (image) {
        uniqueImagename = generateUniqueFileName(image.name)

        const fileBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(fileBuffer)
        const params = {
          Bucket: "instamint-laym-bucket",
          Key: uniqueImagename,
          Body: buffer,
          ContentType: "image/png"
        }

        await pkg.upload(params).promise()
      }

      const newTeabag = await TeabagModel.query().insert({
        ownerId: userId,
        name,
        description: description || null,
        private: isPrivate || false,
        image: uniqueImagename
      })

      let groupMembers = [
        {
          userId,
          teabagId: newTeabag.id
        }
      ]

      if (invitedEmails && invitedEmails.length > 0) {
        const users = await UserModel.query().whereIn("email", invitedEmails)
        const additionalGroupMembers = users.map(user => ({
          userId: user.id,
          teabagId: newTeabag.id
        }))
        groupMembers = groupMembers.concat(additionalGroupMembers)
      }

      await GroupMemberModel.query().insert(groupMembers)

      const userCount = await GroupMemberModel.query()
        .where("teabagId", newTeabag.id)
        .count("userId as userCount")
        .first()
      const numberOfUsers = userCount ? userCount.count : 1

      c.status(200)

      return c.json({
        result: newTeabag,
        numberOfUsers,
        success: true,
        message: "Teabag created successfully"
      })
    } catch (error) {
      c.status(500)

      return c.json({
        result: error,
        success: false,
        message: `INTERNAL SERVER ERROR: ${error}`
      })
    }
  })

  app.route("/", createTeabag)
}

export default prepareRoutesCreateTeabag
