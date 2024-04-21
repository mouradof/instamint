import { faker } from '@faker-js/faker'
import UserModel from '../models/UserModel.js'
import TeabagModel from '../models/TeabagModel.js'
import GroupMemberModel from '../models/GroupMemberModel.js'

export const seed = async (knex) => {
  UserModel.knex(knex)
  TeabagModel.knex(knex)
  GroupMemberModel.knex(knex)
  const users = await UserModel.query()
  const teabags = await TeabagModel.query()

  for (const teabag of teabags) {
    const numberOfMembers = faker.number.int({ min: 1, max: users.length })
    const selectedUsers = faker.helpers.shuffle(users).slice(0, numberOfMembers)
    for (const user of selectedUsers) {
      await GroupMemberModel.query().insert({
        userId: user.id,
        teabagId: teabag.id
      })
    }
  }
}
