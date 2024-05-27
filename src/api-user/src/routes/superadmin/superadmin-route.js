import { Hono } from 'hono'
import UserModel from '../../db/models/UserModel.js' // Assurez-vous du chemin correct

const superAdminRoute = new Hono()

superAdminRoute.get('/', async (ctx) => {
  const users = await UserModel.query()
  return ctx.json(users)
})

export default superAdminRoute
