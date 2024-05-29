import { Hono } from "hono"
import bcrypt from "bcrypt"
import UserModel from "../db/models/UserModel.js"
import sendVerificationEmail from "../helpers/emailHelper.js"

const prepareRouteRegister = ({ app }) => {
  const auth = new Hono()

  auth.post("/register", async c => {
    const body = await c.req.json()
    const { username, email, password } = body

    try {
      const existingUser = await UserModel.query().where({ email }).first()

      if (existingUser) {
        return c.json({ message: "Email already in use" }, 409)
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = await UserModel.query().insert({
        username,
        email,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        verifyToken: UserModel.generateVerifyToken(),
        emailVerified: false,
        isBanned: false,
        bannedUntil: null
      })

      await sendVerificationEmail(newUser.email, newUser.verifyToken)

      return c.json(
        {
          message: "User registered. Please check your email to verify your account."
        },
        201
      )
    } catch (error) {
      return c.json({ message: "Error registering user", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteRegister
