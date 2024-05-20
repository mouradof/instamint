import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"
import PostModel from "../models/PostModel.js"

export const seed = async knex => {
  UserModel.knex(knex)
  PostModel.knex(knex)

  const users = await UserModel.query().select("id")
  const posts = await PostModel.query().select("id")
  const likeData = []

  for (const post of posts) {
    const numLikes = faker.number.int({ min: 1, max: 20 })
    const shuffledUsers = faker.helpers.shuffle(users.map(user => user.id))

    for (let i = 0; i < numLikes; i++) {
      likeData.push({
        userId: shuffledUsers[i],
        postId: post.id
      })
    }
  }

  await knex("likes").insert(likeData)
}
