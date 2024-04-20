import { Hono } from "hono"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../db/models/UserModel.js"

const prepareRouteLogin = ({ app }) => {
  const auth = new Hono()

  auth.post("/login", async (c) => {
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

      if (!user.emailVerified) {
        return c.json({ message: "Please verify your email address first" }, 401)
      }

      const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }, process.env.JWT_SECRET, { expiresIn: "1h" })

      return c.json({ message: "Auth successful", token }, 200)
    } catch (error) {
      return c.json({ message: "Authentication service unavailable" }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteLogin