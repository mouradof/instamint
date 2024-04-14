import * as dotenv from "dotenv"
import { resolve } from "node:path"
import { Sequelize } from "sequelize"
import sequelizeConfig from "./sequelizeConfig"

dotenv.config({ path: resolve(".env") })
const sequelize = new Sequelize(sequelizeConfig.development)

const config = {
  port: 3000,
  db: sequelize
}

export default config
