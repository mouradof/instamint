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
  const tablesWithForeignKeys = [
    { table: "posts", column: "ownerId" },
    { table: "likes", column: "userId" },
    { table: "follows", columns: ["followerId", "followedId"] },
    { table: "reports", column: "userId" },
    { table: "teabags", column: "ownerId" },
    { table: "groupMembers", column: "userId" }
  ]

  for (const { table, column, columns } of tablesWithForeignKeys) {
    if (column) {
      await knex.raw(`
        DO $$ BEGIN
          IF EXISTS (
            SELECT 1 FROM pg_constraint
            WHERE conname = '${table}_${column}_foreign'
          ) THEN
            ALTER TABLE "${table}" DROP CONSTRAINT "${table}_${column}_foreign";
          END IF;
        END $$;
      `)
    }

    if (columns) {
      for (const col of columns) {
        await knex.raw(`
          DO $$ BEGIN
            IF EXISTS (
              SELECT 1 FROM pg_constraint
              WHERE conname = '${table}_${col}_foreign'
            ) THEN
              ALTER TABLE "${table}" DROP CONSTRAINT "${table}_${col}_foreign";
            END IF;
          END $$;
        `)
      }
    }
  }

  await knex.schema.dropTableIfExists("users")
  await knex.schema.dropTableIfExists("roles")
}
