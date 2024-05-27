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

      const match = await bcrypt.compare(password, user.passwordHash)

      if (!match) {
        return c.json({ message: "Email or password is incorrect" }, 401)
      }

      const now = new Date().toISOString()

      const lastLoginDate = new Date(user.lastLoginDate)

      const diffDays = Math.ceil((new Date(now) - lastLoginDate) / (1000 * 60 * 60 * 24))

      if (diffDays > 15) {
        await UserModel.query().deleteById(user.id)

        return c.json({ message: "Account has been deleted due to inactivity" }, 401)
      }

      try {
        await UserModel.query().patchAndFetchById(user.id, { lastLoginDate: now })
      } catch (error) {
        return c.json({ message: "Failed to update last login date", error: error.message }, 500)
      }

      if (!user.emailVerified) {
        return c.json({ message: "Please verify your email address first" }, 401)
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 5
      }

      const token = await sign(payload, process.env.JWT_SECRET)

      let redirectUrl = '/profile';
      if (user.role === 'role_admin') {
        redirectUrl = '/admin';
      } else if (user.role === 'role_superadmin') {
        redirectUrl = '/superadmin';
      }

      return c.json(
        {
          message: "Auth successful",
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            coverImage: user.coverImage,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            role: user.role
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
