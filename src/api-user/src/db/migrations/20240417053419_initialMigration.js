export const up = async knex => {
  await knex.schema.createTable("users", table => {
    table.increments("id").primary()
    table.string("username", 255).unique().notNullable()
    table.string("email", 255).unique().notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.boolean("emailVerified").defaultTo(false)
    table.text("verifyToken").nullable()
    table.text("bio").nullable().defaultTo(null)
    table.integer("followers").defaultTo(0)
    table.integer("following").defaultTo(0)
    table.string("profileImage", 255).defaultTo("path/to/default/profile.jpg")
    table.string("coverImage", 255).defaultTo("path/to/default/cover.jpg")
  })
}

export const down = async knex => {
  await knex.schema.dropTableIfExists("users")
}