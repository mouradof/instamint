import { config } from "dotenv"
import { resolve } from "path"

config()

const knexfile = {
  client: "pg",
  connection: {
    host: "postgres-db" || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "user", 
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "instamintdb",
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