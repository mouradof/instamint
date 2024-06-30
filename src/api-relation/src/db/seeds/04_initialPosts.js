import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"
import TeabagModel from "../models/TeabagModel.js"
import PostModel from "../models/PostModel.js"

export const seed = async knex => {
  UserModel.knex(knex)
  TeabagModel.knex(knex)
  PostModel.knex(knex)

  const users = await UserModel.query().select("id")
  const teabags = await TeabagModel.query().select("id")
  const numUsers = users.length
  const numTeabags = teabags.length
  const postsData = []
  const numPosts = 50

  for (let i = 0; i < numPosts; i++) {
    const isUserPost = faker.datatype.boolean()
    const ownerId = isUserPost ? faker.number.int({ min: 1, max: numUsers }) : null
    const teabagId = !isUserPost ? faker.number.int({ min: 1, max: numTeabags }) : null

    postsData.push({
      ownerId,
      teabagId,
      createdAt: faker.date.past(),
      description: faker.lorem.sentence(),
      mediaData: faker.image.imageUrl(),
      isDraft: faker.datatype.boolean(),
      location: faker.address.city(),
      hashtags: faker.lorem.words(3)
    })
  }

  await knex("posts").insert(postsData)
}
