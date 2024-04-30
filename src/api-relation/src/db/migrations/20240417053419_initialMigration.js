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

  await knex.schema.createTable("teabags", function (table) {
    table.increments("id").primary()
    table.integer("ownerId").unsigned().references("id").inTable("users").onDelete("SET NULL")
    table.string("name").notNullable()
    table.string("description")
    table.dateTime("createDate").defaultTo(knex.fn.now())
    table.dateTime("updatedDate").defaultTo(knex.fn.now())
    table.boolean("private").defaultTo(false)
    table.string("image")
  })

  await knex.schema.createTable("groupMembers", table => {
    table.increments("id").primary()
    table.integer("userId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.integer("teabagId").unsigned().references("id").inTable("teabags").onDelete("CASCADE")
    table.unique(["userId", "teabagId"])
  })
}

export const down = async knex => {
  await knex.schema.dropTableIfExists("groupMembers")
  await knex.schema.dropTableIfExists("teabags")
  await knex.schema.dropTableIfExists("users")
}
