import knex from "knex";
import { faker } from '@faker-js/faker';
import hashPassword from "../hashPassword";

interface User {
  username: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}

exports.seed  = async () => {
  await knex("user").del();

  const users: User[] = [];
  for (let i = 1; i <= 10; i += 1) {
    const [passwordHash, passwordSalt] = await hashPassword(`Password123?`);
    const username = faker.internet.userName();
    const email = faker.internet.email();
    users.push({
      username,
      email,
      passwordHash,
      passwordSalt,
    });
  }

  await knex("user").insert(users);
};
