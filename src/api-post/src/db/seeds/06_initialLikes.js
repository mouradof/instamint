import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"
import PostModel from "../models/PostModel.js"

export const seed = async (knex) => {
  UserModel.knex(knex)
  PostModel.knex(knex)
  const users = await UserModel.query().select("id")
  const posts = await PostModel.query().select("id")
  const likeData = []

  for (let i = 1; i <= 20; i += 1) {
    let userId, postId

    do {
      userId = faker.datatype.number({ min: 1, max: users.length })
      postId = faker.datatype.number({ min: 1, max: posts.length })
    } while (
      likeData.some((like) => like.userId === userId && like.postId === postId)
    )

    likeData.push({
      userId,
      postId,
    })
  }
  await knex("likes").insert(likeData)
}
