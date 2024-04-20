import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import knex from "knex"
import { authMiddleware } from "./src/middleware/auth.js"
import BaseModel from "./src/db/models/BaseModel.js"
import config from "./config.js"
import prepareRouteRegister from "./src/routes/register-route.js"
import prepareRouteLogin from "./src/routes/login-route.js"
import prepareRouteVerify from "./src/routes/verify-route.js"
import dotenv from "dotenv"

dotenv.config()

const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()

app.use(logger())
app.use(cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["*"],
  credentials: true,
}))
app.use("/api/protected", authMiddleware)

prepareRouteRegister({ app, db })
prepareRouteLogin({ app, db })
prepareRouteVerify({ app, db })

serve({
  fetch: app.fetch,
  port: config.port,
})

// eslint-disable-next-line no-console
console.log(`Server listening on port ${config.port}`)