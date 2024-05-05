import { faker } from "@faker-js/faker"

export const seed = async (knex) => {
  const userData = []
  const avatarUrls = new Set()

  for (let i = 1; i <= 20; i += 1) {
    let avatarUrl

    do {
      avatarUrl = faker.image.avatarLegacy()
    } while (avatarUrls.has(avatarUrl))

    avatarUrls.add(avatarUrl)

    userData.push({
      username: faker.internet.userName().substring(0, 10),
      avatarUrl: avatarUrl,
    })
  }
  await knex("users").insert(userData)
}
