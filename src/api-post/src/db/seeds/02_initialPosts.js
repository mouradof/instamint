import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"

export const seed = async (knex) => {
  UserModel.knex(knex)
  const users = await UserModel.query().select("id")
  const postData = []

  for (let i = 1; i <= 10; i += 1) {
    const ownerId = faker.datatype.number({ min: 1, max: users.length })
    postData.push({
      ownerId,
      avatarUrl: faker.image.avatar(),
      username: faker.internet.userName(),
      certified: faker.datatype.boolean(),
      timeAgo: faker.date.recent(),
      content: faker.lorem.text(),
      imageUrl: faker.image.imageUrl(),
      likes: faker.datatype.number({ min: 0, max: 10000 }),
      comments: faker.datatype.number({ min: 0, max: 1000 }),
      reposts: faker.datatype.number({ min: 0, max: 100 }),
      liked: faker.datatype.boolean(),
      commented: faker.datatype.boolean(),
      reposted: faker.datatype.boolean(),
    })
  }
  await knex("posts").insert(postData)
}
