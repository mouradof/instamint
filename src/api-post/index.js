import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import knex from "knex"
import BaseModel from "./src/db/models/BaseModel.js"
import config from "./config.js"
import prepareRoutes from "./prepareRoutes.js"
import postRoutes from "./src/routes/posts.js"
import "dotenv/config"

const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()
app.use(logger())

const corsMiddleware = cors({
  origin: config.cors.allowedOrigins,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["authorization", "content-type"],
  credentials: true
})

app.use("*", corsMiddleware)

const routesWithCors = [
  "/posts/:userId",
  "/post/for-you/:id",
  "/post/subscribed/:id",
  "/post/:postId/:userId",
  "/post/liked/:postId/:userId",
  "/post/likes/:postId/:userId",
  "/post/like/:postId/:userId",
  "/post/report/:postId/:userId"
]

routesWithCors.forEach(route => {
  app.use(route, corsMiddleware)
})

prepareRoutes({ app, db })

app.route("/post", postRoutes)

serve({
  fetch: app.fetch,
  port: config.port
})

// eslint-disable-next-line no-console
console.log(`Listening on : ${config.port}`)
