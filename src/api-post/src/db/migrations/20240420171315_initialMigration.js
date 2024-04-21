export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("username", 255).unique().notNullable()
    table.string("email", 255).unique().notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.text("bio")
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table
      .integer("ownerId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
    table.string("avatarUrl")
    table.string("username", 255)
    table.boolean("certified").defaultTo(false)
    table.dateTime("timeAgo")
    table.text("content").notNullable()
    table.string("imageUrl")
    table.integer("likes").defaultTo(0)
    table.integer("comments").defaultTo(0)
    table.integer("reposts").defaultTo(0)
    table.boolean("liked").defaultTo(false)
    table.boolean("commented").defaultTo(false)
    table.boolean("reposted").defaultTo(false)
  })
}

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("posts")
  await knex.schema.dropTableIfExists("users")
}
