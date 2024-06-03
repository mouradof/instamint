export const up = async knex => {
  await knex.schema.createTable("posts", table => {
    table.increments("id").primary()
    table.integer("ownerId").unsigned().references("id").inTable("users").onDelete("SET NULL")
    table.datetime("createdAt", { precision: 3 }).defaultTo(knex.fn.now(3))
    table.text("description").notNullable().defaultTo("")
    table.string("imageUrl").notNullable()
  })

  await knex.schema.createTable("likes", table => {
    table.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.integer("postId").unsigned().references("id").inTable("posts").onDelete("CASCADE")
    table.primary(["userId", "postId"])
  })

  await knex.schema.createTable("follows", table => {
    table.integer("followerId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.integer("followedId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.primary(["followerId", "followedId"])
  })

  await knex.schema.createTable("reports", table => {
    table.integer("postId").unsigned().references("id").inTable("posts").onDelete("CASCADE")
    table.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.text("reason").notNullable()
    table.datetime("createdAt", { precision: 3 }).defaultTo(knex.fn.now(3))
    table.primary(["postId", "userId"])
  })

  await knex.schema.createTable("comments", table => {
    table.increments("id").primary()
    table.integer("postId").references("id").inTable("posts").onDelete("CASCADE")
    table.integer("userId").references("id").inTable("users").onDelete("CASCADE")
    table.string("content", 255).notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

export const down = async knex => {
  await knex.raw('DROP TABLE IF EXISTS "reports" CASCADE')
  await knex.raw('DROP TABLE IF EXISTS "likes" CASCADE')
  await knex.raw('DROP TABLE IF EXISTS "follows" CASCADE')
  await knex.raw('DROP TABLE IF EXISTS "posts" CASCADE')
  await knex.raw('DROP TABLE IF EXISTS "comments" CASCADE')
}
