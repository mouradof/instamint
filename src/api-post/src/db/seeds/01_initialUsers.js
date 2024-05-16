import { faker } from "@faker-js/faker"
import hashPassword from "../hashPassword.js"

export const seed = async knex => {
  const users = []
  for (let i = 1; i <= 20; i += 1) {
    const [passwordHash, passwordSalt] = await hashPassword("Password123?")
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const bio = faker.lorem.text()
    const profileImage = faker.image.avatarLegacy()
    users.push({
      username,
      email,
      passwordHash,
      passwordSalt,
      bio,
      profileImage
    })
  }
  await knex("users").insert(users)
}
