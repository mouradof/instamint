import { faker } from "@faker-js/faker"
import knex from "knex"
import knexfile from "../../../../knexfile"
import hashPassword from "../hashPassword"

interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  bio: string;
}

interface NFT {
  title: string;
  description: string;
  imageurl: string;
  ownerid: number | null;
  price: number;
  status: string;
}

const db = knex(knexfile)

export const seed = async (): Promise<void> => {
  await db.raw("TRUNCATE TABLE nfts RESTART IDENTITY CASCADE")
  await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")

  const users: User[] = []
  const nfts: NFT[] = []
  const hashPromises = Array.from({ length: 10 }, () => hashPassword(`Password123?`))
  const passwords = await Promise.all(hashPromises)

  for (let i = 0; i < 10; i += 1) {
    const [passwordHash, passwordSalt] = passwords[i]
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const bio = faker.lorem.sentence()
    users.push({
      username,
      email,
      passwordHash,
      passwordSalt,
      bio,
    })
  }

  const insertedUsers = await db("users").insert(users).returning<User[]>("*")
  const getRandomUserId = (): number => {
    const randomIndex: number = Math.floor(Math.random() * insertedUsers.length)

    
return insertedUsers[randomIndex].id as number
  }

  for (let i = 0; i < 10; i += 1) {
    const title = faker.commerce.productName()
    const description = faker.lorem.paragraph()
    const imageurl = faker.image.imageUrl()
    const ownerid = getRandomUserId()
    const price = parseFloat(faker.commerce.price())
    const status = "available"

    nfts.push({
      title,
      description,
      imageurl,
      ownerid,
      price,
      status,
    })
  }

  await db("nfts").insert(nfts)
}
