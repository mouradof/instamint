import { faker } from "@faker-js/faker";
import hashPassword from "../hashPassword.js";
import crypto from "crypto";

const createFakeUser = async () => {
  const password = faker.internet.password();
  const [passwordHash, passwordSalt] = await hashPassword(password);
  const verifyToken = crypto.randomBytes(16).toString("hex");

  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    passwordHash,
    passwordSalt,
    bio: faker.lorem.sentence(),
    emailVerified: false,
    verifyToken,
    profileImage: `https://source.unsplash.com/random/400x400?sig=${Math.floor(Math.random() * 1000)}`, // Random profile image
    coverImage: `https://source.unsplash.com/random/1200x400?sig=${Math.floor(Math.random() * 1000)}`, // Random cover image
    followers: faker.datatype.number({ min: 0, max: 10000 }),
    following: faker.datatype.number({ min: 0, max: 1000 })
  };
}

export const seed = async (knex) => {
  await knex("users").del();
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  const fakeUsers = [];

  for (let i = 1; i <= 10; i += 1) {
    const fakeUser = await createFakeUser();
    fakeUsers.push(fakeUser);
  }

  await knex("users").insert(fakeUsers);
}
