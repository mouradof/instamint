import { faker } from "@faker-js/faker"
import hashPassword from "../hashPassword.js"
import crypto from "crypto"

const createFakeUser = async () => {
  const password = faker.internet.password()
  const [passwordHash, passwordSalt] = await hashPassword(password)
  const verifyToken = crypto.randomBytes(16).toString("hex")

  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    passwordHash,
    passwordSalt,
    bio: faker.lorem.sentence(),
    emailVerified: false,
    verifyToken
  }
}

export const seed = async (knex) => {
  await knex("users").del()
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")

  const promises = Array.from({ length: 10 }, createFakeUser)
  const fakeUsers = await Promise.all(promises)

  await knex("users").insert(fakeUsers)
}