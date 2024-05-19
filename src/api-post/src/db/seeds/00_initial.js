export const seed = async knex => {
  await knex.raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
}
