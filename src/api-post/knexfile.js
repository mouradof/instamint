import { config } from "dotenv"
import { resolve } from "path"

config()

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: resolve("src/db/migrations"),
    stub: resolve("src/db/migration.stub"),
  },
  seeds: {
    directory: resolve("src/db/seeds"),
  },
}

export default knexfile
