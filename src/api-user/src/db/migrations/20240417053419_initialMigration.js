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
    table.string("profileImage", 255).defaultTo("/images/default-profile-picture.jpg")
    table.string("coverImage", 255).defaultTo("/images/default-cover-picture.jpg")
    table.timestamp("lastLoginDate").defaultTo(knex.fn.now())
    table.enu("role", ["role_user", "role_admin", "role_superadmin"]).defaultTo("role_user").notNullable()
  })

  await knex.schema.createTable("roles", table => {
    table.increments("id").primary()
    table.string("role_name").notNullable()
  })

  await knex("roles").insert([
    { role_name: "role_user" },
    { role_name: "role_admin" },
    { role_name: "role_superadmin" }
  ])
}

export const down = async knex => {
  await knex.schema.alterTable("posts", table => {
    table.dropForeign("ownerId")
  })
  await knex.schema.alterTable("likes", table => {
    table.dropForeign("userId")
  })
  await knex.schema.alterTable("follows", table => {
    table.dropForeign("followerId")
    table.dropForeign("followedId")
  })
  await knex.schema.alterTable("reports", table => {
    table.dropForeign("userId")
  })
  await knex.schema.alterTable("teabags", table => {
    table.dropForeign("ownerId")
  })
  await knex.schema.alterTable("groupMembers", table => {
    table.dropForeign("userId")
  })

  await knex.schema.dropTableIfExists("users")
  await knex.schema.dropTableIfExists("roles")
}
