import { Hono } from "hono"
import bcrypt from "bcrypt"
import { sign } from "hono/jwt"
import UserModel from "../db/models/UserModel.js"

const prepareRouteLogin = ({ app }) => {
  const auth = new Hono()

  auth.post("/login", async c => {
    const body = await c.req.json()
    const { email, password } = body

    try {
      const user = await UserModel.query().where({ email }).first()

      if (!user) {
        return c.json({ message: "Email or password is incorrect" }, 401)
      }

      await UserModel.updateBanStatus(user.id)

      const updatedUser = await UserModel.query().findById(user.id)

      if (updatedUser.isBanned) {
        return c.json({ message: "Account is banned" }, 403)
      }

      const match = await bcrypt.compare(password, updatedUser.passwordHash)

      if (!match) {
        return c.json({ message: "Email or password is incorrect" }, 401)
      }

      const now = new Date().toISOString()

      const lastLoginDate = new Date(updatedUser.lastLoginDate)
      const diffDays = Math.ceil((new Date(now) - lastLoginDate) / (1000 * 60 * 60 * 24))

      if (diffDays > 15) {
        await UserModel.query().deleteById(updatedUser.id)

        return c.json({ message: "Account has been deleted due to inactivity" }, 401)
      }

      try {
        await UserModel.query().patchAndFetchById(updatedUser.id, { lastLoginDate: now })
      } catch (error) {
        return c.json({ message: "Failed to update last login date", error: error.message }, 500)
      }

      if (!updatedUser.emailVerified) {
        return c.json({ message: "Please verify your email address first" }, 401)
      }

      const payload = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 5
      }

      const token = await sign(payload, process.env.JWT_SECRET)

      let redirectUrl = "/profile"

      if (updatedUser.role === "role_admin") {
        redirectUrl = "/admin"
      } else if (updatedUser.role === "role_superadmin") {
        redirectUrl = "/superadmin"
      }

      return c.json(
        {
          message: "Auth successful",
          token,
          user: {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
            coverImage: updatedUser.coverImage,
            bio: updatedUser.bio,
            followers: updatedUser.followers,
            following: updatedUser.following,
            role: updatedUser.role
          },
          redirectUrl
        },
        200
      )
    } catch (error) {
      return c.json({ message: "Authentication service unavailable", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteLogin
