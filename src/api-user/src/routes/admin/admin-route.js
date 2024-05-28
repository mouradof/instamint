import { Hono } from "hono"
import UserModel from "../../db/models/UserModel.js"

const adminRoute = new Hono()

adminRoute.get("/", ctx => {
  return ctx.json({ message: "Bonjour Admin" })
})

adminRoute.get("/users", async ctx => {
  try {
    const users = await UserModel.query()

    return ctx.json(users)
  } catch (error) {
    return ctx.json({ error: "Failed to fetch users" }, 500)
  }
})

adminRoute.put("/ban/:id", async ctx => {
  const { id } = ctx.req.param()
  const { banDuration } = await ctx.req.json()

  const banDurations = {
    "10min": 10 * 60 * 1000,
    "12h": 12 * 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "1week": 7 * 24 * 60 * 60 * 1000,
    "1month": 30 * 24 * 60 * 60 * 1000,
    forever: null
  }

  const bannedUntil = banDurations[banDuration] ? new Date(Date.now() + banDurations[banDuration]).toISOString() : null

  try {
    const updatedUser = await UserModel.query().patchAndFetchById(id, {
      isBanned: true,
      bannedUntil
    })

    if (!updatedUser) {
      return ctx.json({ error: "User not found or ban failed" }, 404)
    }

    return ctx.json(updatedUser)
  } catch (error) {
    return ctx.json({ error: "Failed to ban user" }, 500)
  }
})

export default adminRoute
