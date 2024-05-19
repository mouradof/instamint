import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import knex from "knex"
import BaseModel from "./src/db/models/BaseModel.js"
import config from "./config.js"
import prepareRoutes from "./prepareRoutes.js"

const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()
app.use(logger())

const routesWithCors = [
  "/post/for-you/:id",
  "/post/subscribed/:id",
  "/post/liked/:postId/:userId",
  "/post/likes/:postId/:userId",
  "/post/like/:postId/:userId"
]

routesWithCors.forEach(route => {
  app.use(
    route,
    cors({
      origin: config.cors.allowedOrigins,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["authorization", "content-type"],
      credentials: true
    })
  )
})

prepareRoutes({ app, db })

serve({
  fetch: app.fetch,
  port: config.port
})

// eslint-disable-next-line no-console
console.log(`Listening on : ${config.port}`)
