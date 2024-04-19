export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
      table.increments("id").primary()
      table.string("username", 255).unique().notNullable()
      table.string("email", 255).unique().notNullable()
      table.text("passwordHash").notNullable()
      table.text("passwordSalt").notNullable()
      table.boolean("emailVerified").defaultTo(false)
      table.text("verifyToken").nullable() // Reflects the nullable "verifyToken" field for email verification
      table.text("bio").nullable().defaultTo(null) // Reflects the optional bio, which can be null
  })
}

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
}