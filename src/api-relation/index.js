import { serve } from "@hono/node-server"
import config from "./config.js"
import server from "./server.js"

server(config).then((app) => {
  serve({
    fetch: app.fetch,
    port: config.port,
  })
})