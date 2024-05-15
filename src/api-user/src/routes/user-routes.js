import { Hono } from "hono"
import UserModel from "../db/models/UserModel.js"
import bcrypt from "bcrypt"

const userRoutes = new Hono()

userRoutes.get("/user/:id", async c => {
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

userRoutes.put("/user/:id/change-password", async c => {
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
    console.error("Error updating password:", error)
    return c.json({ message: "Error updating password", error: error.message }, 500)
  }
})

userRoutes.put("/user/:id", async c => {
  const id = c.req.param("id")
  const body = await c.req.json()
  if (!body.username || !body.bio) {
    return c.json({ message: "Username and bio fields are required and cannot be empty" }, 400)
  }

  const existingUser = await UserModel.query().where("username", body.username).andWhere("id", "!=", id).first()
  if (existingUser) {
    return c.json({ message: "Username already exists" }, 409)
  }

  const updatedUser = await UserModel.query().patchAndFetchById(id, {
    username: body.username,
    bio: body.bio,
    profileImage: body.profileImage,
    coverImage: body.coverImage
  })
  if (!updatedUser) {
    return c.json({ message: "User not found" }, 404)
  }
  return c.json(updatedUser, 200)
})

userRoutes.delete("/user/:id", async c => {
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
