import { Hono } from "hono"
import bcrypt from "bcrypt"
import { sign } from "hono/jwt"
import UserModel from "../db/models/UserModel.js"

const prepareRouteWallet = ({ app }) => {
  const auth = new Hono()

  auth.post("/checkWallet", async c => {
    const body = await c.req.json()
    const { walletAddress } = body

    try {
      const user = await UserModel.query().where({ walletAddress }).first()

      if (user) {
        const payload = {
          id: user.id,
          username: user.username,
          walletAddress: user.walletAddress,
          exp: Math.floor(Date.now() / 1000) + 60 * 5
        }

        const token = await sign(payload, process.env.JWT_SECRET)

        return c.json(
          {
            exists: true,
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              walletAddress: user.walletAddress,
              profileImage: user.profileImage,
              coverImage: user.coverImage,
              bio: user.bio,
              followers: user.followers,
              following: user.following
            }
          },
          200
        )
      } else {
        return c.json({ exists: false })
      }
    } catch (error) {
      return c.json({ message: "Error checking wallet", error: error.message }, 500)
    }
  })

  auth.post("/registerWallet", async c => {
    const body = await c.req.json()
    const { username, email, password, walletAddress } = body

    try {
      const existingUser = await UserModel.query().where({ walletAddress }).first()

      if (existingUser) {
        return c.json({ message: "Wallet address already in use" }, 409)
      }

      let passwordHash = null
      let salt = null

      if (password) {
        salt = await bcrypt.genSalt(10)
        passwordHash = await bcrypt.hash(password, salt)
      }

      const newUser = await UserModel.query().insert({
        username,
        email,
        passwordHash,
        passwordSalt: salt,
        walletAddress,
        emailVerified: true // Assuming no email verification needed for wallet login
      })

      const payload = {
        id: newUser.id,
        username: newUser.username,
        walletAddress: newUser.walletAddress,
        exp: Math.floor(Date.now() / 1000) + 60 * 5
      }

      const token = await sign(payload, process.env.JWT_SECRET)

      return c.json(
        {
          message: "User registered successfully",
          token,
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            walletAddress: newUser.walletAddress,
            profileImage: newUser.profileImage,
            coverImage: newUser.coverImage,
            bio: newUser.bio,
            followers: newUser.followers,
            following: newUser.following
          }
        },
        201
      )
    } catch (error) {
      return c.json({ message: "Error registering user", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteWallet
