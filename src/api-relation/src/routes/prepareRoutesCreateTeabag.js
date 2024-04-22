import { Hono } from "hono"
import { validator } from "hono/validator"
import UserModel from "../db/models/UserModel.js"
import TeabagModel from "../db/models/TeabagModel.js"
import GroupMemberModel from "../db/models/GroupMemberModel.js" 
import { stringValidator, booleanValidator } from "../validators.js"
import { z } from "zod"

const prepareRoutesCreateTeabag = ({ app }) => {
    const createTeabag = new Hono()

    const teaBagSchema = z.object({
        name: stringValidator,
        description: stringValidator.optional(),
        isPrivate: booleanValidator.optional(),
        userEmails: z.array(stringValidator).optional(),
    })

    createTeabag.post("/:userId/createTeabag",
        validator("json", (value, c) => {
            const validatedData = teaBagSchema.safeParse(value)

            if (!validatedData.success) {
                c.status(400)

                return c.json({
                    success: false,
                    message: "Invalid teabag data",
                    errors: validatedData.error.errors,
                })
            }

            return validatedData.data
        }),
        async (c) => {
            try {
                const userId = c.req.param("userId")
                const { name, description, isPrivate, userEmails } = c.req.valid("json")

                const userExists = await UserModel.query().findById(userId)

                if (!userExists) {
                    c.status(404)

                    return c.json({
                        success: false,
                        message: `User not found`,
                    })
                }

                const newTeabag = await TeabagModel.query().insert({
                    ownerId: userId,
                    name,
                    description: description || null,
                    private: isPrivate || false,
                })

                let groupMembers = []

                groupMembers.push({
                    userId: userId,
                    teabagId: newTeabag.id,
                })

                if (userEmails && userEmails.length > 0) {
                    const users = await UserModel.query().whereIn("email", userEmails)
                    const additionalGroupMembers = users.map((user) => ({
                        userId: user.id,
                        teabagId: newTeabag.id,
                    }))
                    groupMembers = groupMembers.concat(additionalGroupMembers)
                }

                await GroupMemberModel.query().insert(groupMembers)
                                
                const userCount = await GroupMemberModel.query().count("userId").where("teabagId", newTeabag.id).first()
                const numberOfUsers = userCount ? userCount.count : 1

                c.status(201)

                return c.json({
                    result: newTeabag,
                    numberOfUsers,
                    success: true,
                    message: `Teabag created successfully`,
                })
            } catch (error) {
                c.status(500)

                return c.json({
                    result: error,
                    success: false,
                    message: `INTERNAL SERVER ERROR: ${error}`,
                })
            }
        }
    )

    app.route("/", createTeabag)
}

export default prepareRoutesCreateTeabag
