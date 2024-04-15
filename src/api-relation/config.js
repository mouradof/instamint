import knexfile from "./knexfile.js"
import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({ path: resolve(".env") })

const config = {
  port: 3030,
  db: knexfile
}

export default config
