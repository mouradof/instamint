import { Hono } from "hono"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../db/models/UserModel.js"
import sendVerificationEmail from "../helpers/emailHelper.js"

const prepareAuthRoutes = ({ app }) => {
  const auth = new Hono()

  auth.post("/register", async (c) => {
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
        passwordSalt: salt, // Storing salt as well
        verifyToken: UserModel.generateVerifyToken(),
      })

      sendVerificationEmail(newUser.email, newUser.verifyToken)

      return c.json({ message: "User registered. Please check your email to verify your account." }, 201)
    } catch (error) {
      return c.json({ message: "Error registering user", error: { message: error.message, stack: error.stack } }, 500)
    }
  })

  auth.post("/login", async (c) => {
    const body = await c.req.json() // Manually parse JSON from the request
    const { email, password } = body

    try {
      const user = await UserModel.query().where({ email }).first()

      if (!user) {
        return c.json({ message: "Auth failed" }, 401)
      }

      const match = await bcrypt.compare(password, user.passwordHash)
      
      if (!match) {
        return c.json({ message: "Auth failed" }, 401)
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
      return c.json({ message: "Auth failed", error }, 500)
    }
  })

  auth.get("/verify", async (c) => {
    const token = c.req.query('token');  // Try using a method call if c.req.query as an object fails
    console.log("Token:", token);

    try {
      console.log(token)
      const user = await UserModel.query().where({ verifyToken: token }).first()

      if (!user) {
        return c.json({ message: "Invalid or expired verification token" }, 400)
      }

      await UserModel.query().patch({
        emailVerified: true,
        verifyToken: null,
      }).where({ id: user.id })

      return c.json({ message: "Email verified successfully" }, 200)
    } catch (error) {
      return c.json({ message: "Verification failed", error }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareAuthRoutes