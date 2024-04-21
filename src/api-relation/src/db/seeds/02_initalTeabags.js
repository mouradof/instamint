import { faker } from '@faker-js/faker'
import UserModel from '../models/UserModel.js'

export const seed = async (knex) => {
  UserModel.knex(knex)
  const users = await UserModel.query().select('id')
  const numUsers = parseInt(users.length)
  const teabagsData = []
  const numTeabags = 10

  for (let i = 0; i < numTeabags; i++) {
    const ownerId = faker.number.int({ min: 1, max: numUsers })
    teabagsData.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      createDate: faker.date.past(),
      updatedDate: faker.date.recent(),
      private: faker.datatype.boolean(),
      ownerId
    })
  }

  await knex('teabags').insert(teabagsData)
}
