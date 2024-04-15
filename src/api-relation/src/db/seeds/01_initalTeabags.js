import { faker } from "@faker-js/faker"

export const seed = async (knex) => {
  await knex.raw("TRUNCATE TABLE teabags RESTART IDENTITY CASCADE")
  const teabagsData = []
  const numTeabags = 10 

  for (let i = 0; i < numTeabags; i++) {
    teabagsData.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      createDate: faker.date.past(),
      updatedDate: faker.date.recent(),
      private: faker.datatype.boolean(),
    })
  }

  await knex("teabags").insert(teabagsData)
}
