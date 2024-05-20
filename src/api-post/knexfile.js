import { config } from "dotenv"
import { resolve } from "path"

config()

const isMigration = process.env.KNEX_CONTEXT === "migration"

const knexfile = {
  client: "pg",
  connection: {
    host: isMigration ? process.env.DB_HOST_MIGRATIONS : process.env.DB_HOST_API,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  migrations: {
    directory: resolve("src/db/migrations"),
    stub: resolve("src/db/migration.stub")
  },
  seeds: {
    directory: resolve("src/db/seeds")
  }
}

export default knexfile
