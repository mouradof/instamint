import knexfile from "./knexfile.js"
import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({ path: resolve(".env") })

const config = {
  port: 4002,
  db: knexfile,
  security: {
    password: {
      saltlen: 512,
      keylen: 512,
      iterations: 100000,
      digest: "sha512",
      pepper: process.env.SECURITY__PASSWORD__PEPPER
    }
  }
}
export default config
