import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import knex from "knex"
import { authMiddleware } from "./src/middleware/auth.js"
import BaseModel from "./src/db/models/BaseModel.js"
import config from "./config.js"
import prepareAuthRoutes from "./src/routes/auth-routes.js" 
import userRoutes from './src/routes/user-routes.js';


const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()

// Middleware for logging and CORS
app.use(logger())
app.use(cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["*"],
  credentials: true,
}))

// Set up authentication routes
prepareAuthRoutes({ app, db })

app.route('/api', userRoutes);

// Use authentication middleware on routes that require authentication
app.use("/api/protected", authMiddleware)

// Start the server
serve({
  fetch: app.fetch,
  port: config.port,
})

// eslint-disable-next-line no-console
console.log(`Listening on : ${config.port}`)