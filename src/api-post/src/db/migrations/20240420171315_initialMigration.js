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
    // Requires for a correction, I leave the migration as it is to avoid conflicts
    table.integer("followers").defaultTo(0)
    table.integer("following").defaultTo(0)
    table.string("profileImage", 255)
    table.string("coverImage", 255)
  })

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
}

export const down = async knex => {
  await knex.schema.dropTableIfExists("likes")
  await knex.schema.dropTableIfExists("follows")
  await knex.schema.dropTableIfExists("posts")
  await knex.schema.dropTableIfExists("users")
}
