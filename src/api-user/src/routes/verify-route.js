import { Hono } from "hono"
import UserModel from "../db/models/UserModel.js"

const prepareRouteVerify = ({ app }) => {
  const auth = new Hono()

  auth.get("/verify", async c => {
    const { token } = c.req.query()

    try {
      const user = await UserModel.query().where({ verifyToken: token }).first()

      if (!user) {
        return c.json({ message: "Invalid token" }, 400)
      }

      await UserModel.query()

        .findById(user.id)
        .patch({ emailVerified: true, verifyToken: null })

      return c.redirect("http://localhost:3000/login?verified=true")
    } catch (error) {
      return c.json({ message: "Error verifying email", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteVerify
