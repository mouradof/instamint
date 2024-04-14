import dotenv from "dotenv"
dotenv.config()

const sequelizeConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_migrations",
    seederStorageTableName: "sequelize_seeders",
  },
}

export default sequelizeConfig
