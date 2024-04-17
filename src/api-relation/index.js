import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { logger } from "hono/logger" 
import knex from "knex"
import BaseModel from "./src/db/models/BaseModel.js"
import prepareRoutesTeabags from "./src/routes/prepareRoutesTeabags.js"
import config from "./config.js"

const db = knex(config.db)
BaseModel.knex(db)

const app = new Hono()
app.use(logger())

prepareRoutesTeabags({ app, db })

serve({
  fetch: app.fetch,
  port: config.port,
})

app.use((c) => {
  c.status(404).send({ error: "Not found" })
})

// eslint-disable-next-line no-console
console.log(`Listening on : ${config.port}`)