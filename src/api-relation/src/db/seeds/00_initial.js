export const seed = async knex => {
  await knex.raw("TRUNCATE TABLE teabags RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
}
