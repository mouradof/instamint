import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.js"

export const seed = async (knex) => {
  UserModel.knex(knex)
  const users = await UserModel.query().select("id")
  const followData = []

  users.forEach((user) => {
    let followedIds = new Set()

    while (followedIds.size < 5) {
      let followedId = faker.datatype.number({ min: 1, max: users.length })

      if (followedId !== user.id && !followedIds.has(followedId)) {
        followedIds.add(followedId)
        followData.push({
          followerId: user.id,
          followedId: followedId,
        })
      }
    }
  })
  await knex("follows").insert(followData)
}
