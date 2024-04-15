import { Hono } from "hono"
import { logger } from "hono/logger" 
import knex from "knex"
import BaseModel from "./src/db/models/BaseModel.js"
import prepareRoutes from "./prepareRoutes.js"

const server = (async config => {
    const db = knex(config.db)
    BaseModel.knex(db)
  
    const app = new Hono()
    app.use(
      logger(),
    )
  
    prepareRoutes({ app, db })
    
    return app
  }
)

export default server