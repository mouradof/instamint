import { Hono } from "hono"
import UserModel from "../../db/models/UserModel.js"

const adminRoute = new Hono()

adminRoute.post("/ban/:id", async c => {
  const { id } = c.req.param()
  const { duration } = await c.req.json()

  let bannedUntil
  const now = new Date()

  switch (duration) {
    case "10m":
      bannedUntil = new Date(now.getTime() + 10 * 60 * 1000) // 10 minutes

      break

    case "12h":
      bannedUntil = new Date(now.getTime() + 12 * 60 * 60 * 1000) // 12 hours

      break

    case "24h":
      bannedUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

      break

    case "1w":
      bannedUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 1 week

      break

    case "1m":
      bannedUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 1 month

      break

    case "forever":
      bannedUntil = null // Permanent ban

      break

    default:
      return c.json({ message: "Invalid ban duration" }, 400)
  }

  await UserModel.query().patchAndFetchById(id, {
    isBanned: true,
    bannedUntil: bannedUntil ? bannedUntil.toISOString() : null
  })

  return c.json({ message: "User banned successfully" })
})

export default adminRoute
