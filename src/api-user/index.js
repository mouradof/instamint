import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import knex from "knex"
import { authMiddleware } from "./src/middleware/auth.js"
import BaseModel from "./src/db/models/BaseModel.js"
import config from "./config.js"
import userRoutes from './src/routes/user-routes.js';


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


app.route('/api', userRoutes);

app.use("/api/protected", authMiddleware)

serve({
  fetch: app.fetch,
  port: config.port,
})

console.log(`Listening on : ${config.port}`)