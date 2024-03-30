import { Knex } from "knex"

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("username", 255).unique().notNullable()
    table.string("email", 255).unique().notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.text("bio")
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists("users")
}
