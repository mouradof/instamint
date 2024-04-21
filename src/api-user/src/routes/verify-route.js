import { Hono } from "hono"
import UserModel from "../db/models/UserModel.js"

const prepareRouteVerify = ({ app }) => {
  const auth = new Hono()

  auth.get("/verify", async (c) => {
    const token = c.req.query("token")

    if (!token) {
      return c.json({ message: "Verification token is required" }, 400)
    }

    try {
      const user = await UserModel.query().where({ verifyToken: token }).first()

      if (!user) {
        return c.json({ message: "Invalid or expired verification token" }, 404)
      }

      await UserModel.query().patch({
        emailVerified: true,
        verifyToken: null
      }).where({ id: user.id })

      return c.json({ message: "Email verified successfully" }, 200)
    } catch (error) {
      return c.json({ message: "Verification failed", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteVerify