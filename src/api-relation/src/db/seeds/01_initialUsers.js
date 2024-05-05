import { faker } from "@faker-js/faker"
import hashPassword from "../hashPassword.js"

export const seed = async knex => {
  const users = []
  for (let i = 1; i <= 10; i += 1) {
    const [passwordHash, passwordSalt] = await hashPassword("Password123?")
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const bio = faker.lorem.text()
    users.push({
      username,
      email,
      passwordHash,
      passwordSalt,
      bio
    })
  }
  await knex("users").insert(users)
}
