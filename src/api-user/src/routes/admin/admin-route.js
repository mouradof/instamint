import { Hono } from "hono"

const adminRoute = new Hono()

adminRoute.get("/", ctx => {
  return ctx.json({ message: "Bonjour Admin" })
})

export default adminRoute
