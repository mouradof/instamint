import { resolve } from "path"
import { config } from "dotenv"
import { Knex } from "knex"

config()

const knexfile: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: resolve("src/api/db/migrations"),
    stub: resolve("src/api/db/migration.stub"),
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: resolve("src/api/db/seeds"),
  },
}

export default knexfile
