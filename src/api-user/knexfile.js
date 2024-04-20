import { config } from "dotenv"
import { resolve } from "path"

config()

const knexfile = {
  client: "pg",
  connection: {
    host: "postgres-db",
    port: 5432,
    user: "user", 
    password: "password",
    database: "instamintdb",
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