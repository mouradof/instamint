import { Hono } from "hono"
import UserModel from "../db/models/UserModel.js"

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

userRoutes.put("/user/:id", async c => {
  const id = c.req.param("id")

  try {
    const body = await c.req.json()

    if (!body.username || !body.bio) {
      return c.json({ message: "Username and bio fields are required and cannot be empty" }, 400)
    }

    const existingUser = await UserModel.query().where("id", "!=", id).andWhere("username", body.username).first()

    if (existingUser) {
      return c.json({ message: "Username already exists" }, 409)
    }

    const updatedUser = await UserModel.query().patchAndFetchById(id, body)

    if (!updatedUser) {
      return c.json({ message: "User not found" }, 404)
    }

    return c.json(updatedUser, 200)
  } catch (error) {
    return c.json({ message: "Error updating user", error: error.message }, 500)
  }
})

userRoutes.delete("/user/:id", async c => {
  const id = c.req.param("id")

  try {
    const user = await UserModel.query().findById(id)

    if (!user) {
      return c.json({ message: "User not found" }, 404)
    }

    await UserModel.query().deleteById(id)

    return c.json({ message: "User deleted successfully" }, 200)
  } catch (error) {
    return c.json({ message: "Error deleting user", error: error.message }, 500)
  }
})

export default userRoutes
