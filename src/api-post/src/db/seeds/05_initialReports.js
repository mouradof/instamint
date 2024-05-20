import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"
import PostModel from "../models/PostModel.js"

export const seed = async knex => {
  UserModel.knex(knex)
  PostModel.knex(knex)

  const users = await UserModel.query().select("id")
  const posts = await PostModel.query().select("id")
  const reportData = []

  for (const post of posts) {
    const numReports = faker.number.int({ min: 1, max: users.length })
    const shuffledUsers = faker.helpers.shuffle(users.map(user => user.id))

    for (let i = 0; i < numReports; i++) {
      reportData.push({
        userId: shuffledUsers[i],
        postId: post.id,
        reason: faker.lorem.sentence(),
        createdAt: faker.date.recent()
      })
    }
  }

  await knex("reports").insert(reportData)
}
