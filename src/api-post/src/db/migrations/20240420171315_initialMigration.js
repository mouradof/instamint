export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("username", 255).unique().notNullable()
    table.string("avatarUrl", 255).unique().notNullable()
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table
      .integer("ownerId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
    table.datetime("createdAt", { precision: 3 }).defaultTo(knex.fn.now(3))
    table.text("description").notNullable().defaultTo("")
    table.string("imageUrl").notNullable()
  })

  await knex.schema.createTable("likes", (table) => {
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table
      .integer("postId")
      .unsigned()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
    table.primary(["userId", "postId"])
  })

  await knex.schema.createTable("follows", (table) => {
    table
      .integer("followerId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table
      .integer("followedId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.primary(["followerId", "followedId"])
  })
}

export const down = async (knex) => {
  await knex.schema.dropTableIfExists("likes")
  await knex.schema.dropTableIfExists("follows")
  await knex.schema.dropTableIfExists("posts")
  await knex.schema.dropTableIfExists("users")
}
