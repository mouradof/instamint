export const up = async (knex) => {
    await knex.schema.createTable("teabags", function(table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("description")
        table.dateTime("createDate").defaultTo(knex.fn.now())
        table.dateTime("updatedDate").defaultTo(knex.fn.now())
        table.boolean("private").defaultTo(false)
    })
}

export const down = async (knex) => {
    await knex.schema.dropTableIfExists("teabags")
}
