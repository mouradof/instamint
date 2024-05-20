export const up = async knex => {
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
  await knex.raw('DROP TABLE IF EXISTS "groupMembers" CASCADE')
  await knex.raw('DROP TABLE IF EXISTS "teabags" CASCADE')
}
