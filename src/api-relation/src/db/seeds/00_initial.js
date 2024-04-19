// api-relation/src/db/seeds/00_initial.js

export const seed = async (knex) => {
    await knex.raw("TRUNCATE TABLE teabags RESTART IDENTITY CASCADE")
    await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
}