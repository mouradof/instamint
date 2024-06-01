import { Hono } from "hono"
import pkg from "../../configAWS.cjs"
import UserModel from "../db/models/UserModel.js"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"

const generateUniqueFileName = originalFileName => {
  const uniqueId = uuidv4()
  const fileExtension = originalFileName.split(".").pop()

  return `${uniqueId}.${fileExtension}`
}

const userRoutes = new Hono()

userRoutes.get("/:id", async c => {
  const id = c.req.param("id")

  try {
    const user = await UserModel.query().findById(id)

    if (!user) {
      return c.json({ message: "User not found" }, 404)
    }

    return c.json(user, 200)
  } catch (error) {
    return c.json({ message: "Error fetching user", error: error.message }, 500)
  }
})

userRoutes.get("/search/:name", async c => {
  const name = c.req.param("name").toLowerCase()

  try {
    const users = await UserModel.query().whereRaw("LOWER(username) LIKE ?", [`${name}%`])

    if (users.length === 0) {
      return c.json({ message: "No users found" }, 404)
    }

    return c.json(users, 200)
  } catch (error) {
    return c.json({ message: "Error fetching users", error: error.message }, 500)
  }
})

userRoutes.put("/:id/change-password", async c => {
  const id = c.req.param("id")
  const { oldPassword, newPassword } = await c.req.json()

  try {
    const user = await UserModel.query().findById(id)

    if (!user) {
      return c.json({ message: "User not found" }, 404)
    }

    const validPassword = await bcrypt.compare(oldPassword, user.passwordHash)

    if (!validPassword) {
      return c.json({ message: "Old password is incorrect" }, 403)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    await UserModel.query().patchAndFetchById(id, { passwordHash: hashedPassword })

    return c.json({ message: "Password updated successfully. Please log in again.", logout: true }, 200)
  } catch (error) {
    return c.json({ message: "Error updating password", error: error.message }, 500)
  }
})

userRoutes.put("/:id/update", async c => {
  const id = c.req.param("id")
  const body = await c.req.parseBody({ all: true })
  const { username, bio, profileImage, coverImage, useDefaultImages } = body

  if (!username || !bio) {
    return c.json({ message: "Username and bio fields are required and cannot be empty" }, 400)
  }

  const existingUser = await UserModel.query().where("username", username).andWhere("id", "!=", id).first()

  if (existingUser) {
    return c.json({ message: "Username already exists" }, 409)
  }

  let profileImageUrl, coverImageUrl

  if (useDefaultImages === "true") {
    profileImageUrl = "/images/default-profile-picture.jpg"
    coverImageUrl = "/images/default-cover-picture.jpg"
  } else {
    if (profileImage) {
      const uniqueProfileImageName = generateUniqueFileName(profileImage.name)
      const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer())
      const profileImageParams = {
        Bucket: process.env.BUCKET_NAME_S3,
        Key: uniqueProfileImageName,
        Body: profileImageBuffer,
        ContentType: profileImage.type
      }
      await pkg.upload(profileImageParams).promise()
      profileImageUrl = `https://${process.env.BUCKET_NAME_S3}.s3.amazonaws.com/${uniqueProfileImageName}`
    }

    if (coverImage) {
      const uniqueCoverImageName = generateUniqueFileName(coverImage.name)
      const coverImageBuffer = Buffer.from(await coverImage.arrayBuffer())
      const coverImageParams = {
        Bucket: process.env.BUCKET_NAME_S3,
        Key: uniqueCoverImageName,
        Body: coverImageBuffer,
        ContentType: coverImage.type
      }
      await pkg.upload(coverImageParams).promise()
      coverImageUrl = `https://${process.env.BUCKET_NAME_S3}.s3.amazonaws.com/${uniqueCoverImageName}`
    }
  }

  const updatedUser = await UserModel.query().patchAndFetchById(id, {
    username,
    bio,
    profileImage: profileImageUrl,
    coverImage: coverImageUrl
  })

  if (!updatedUser) {
    return c.json({ message: "User not found" }, 404)
  }

  return c.json(updatedUser, 200)
})

userRoutes.delete("/:id", async c => {
  const id = c.req.param("id")
  const { password } = await c.req.json()

  try {
    const user = await UserModel.query().findById(id)

    if (!user) {
      return c.json({ message: "User not found" }, 404)
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)

    if (!validPassword) {
      return c.json({ message: "Password is incorrect" }, 403)
    }

    await UserModel.query().deleteById(id)

    return c.json({ message: "User deleted successfully" }, 200)
  } catch (error) {
    return c.json({ message: "Error deleting user", error: error.message }, 500)
  }
})

export default userRoutes
