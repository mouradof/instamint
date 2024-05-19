import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"

export const seed = async knex => {
  UserModel.knex(knex)
  const users = await UserModel.query().select("id")
  const postData = []

  for (let i = 1; i <= 30; i += 1) {
    const ownerId = faker.number.int({ min: 1, max: users.length })
    postData.push({
      ownerId,
      createdAt: faker.date.recent(),
      description: faker.lorem.lines(2),
      imageUrl: faker.image.imageUrl()
    })
  }
  await knex("posts").insert(postData)
}
