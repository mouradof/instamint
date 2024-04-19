// api-relation/src/api-relation/index.js

import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger" 
import knex from "knex"
import BaseModel from "./src/db/models/BaseModel.js"
import prepareRoutesTeabags from "./src/routes/prepareRoutesTeabags.js"
import config from "./config.js"

const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()
app.use(logger())
app.use(cors({
  origin: "http://localhost:3001",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowHeaders: ["*"], 
  credentials: true,
}))

prepareRoutesTeabags({ app, db })

serve({
  fetch: app.fetch,
  port: config.port,
})

// eslint-disable-next-line no-console
console.log(`Listening on : ${config.port}`)