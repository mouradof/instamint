import { Hono } from "hono"
import UserModel from "../../db/models/UserModel.js"

const superAdminRoute = new Hono()

superAdminRoute.get("/", async ctx => {
  const users = await UserModel.query()

  return ctx.json(users)
})

superAdminRoute.put("/:id/role", async ctx => {
  const { id } = ctx.req.param()
  const { role } = await ctx.req.json()

  const updatedUser = await UserModel.query().patchAndFetchById(id, { role })

  if (!updatedUser) {
    return ctx.json({ error: "User not found or role update failed" }, 404)
  }

  return ctx.json(updatedUser)
})

export default superAdminRoute
