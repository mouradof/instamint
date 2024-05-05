import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"

export const seed = async (knex) => {
  UserModel.knex(knex)
  const users = await UserModel.query().select("id")
  const postData = []

  for (let i = 1; i <= 30; i += 1) {
    const ownerId = faker.datatype.number({ min: 1, max: users.length })
    postData.push({
      ownerId,
      createdAt: faker.date.recent(),
      description: faker.lorem.lines(2),
      imageUrl: `https://source.unsplash.com/random/400x400?sig=${Math.floor(Math.random() * 1000)}`,
    })
  }
  await knex("posts").insert(postData)
}
