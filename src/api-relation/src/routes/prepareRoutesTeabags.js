import { Hono } from "hono"
import TeabagModel from "../db/models/TeabagModel.js"

const prepareRoutesTeabags = ({ app }) => {
  const teabagsData = new Hono()

  teabagsData.get("/teabagsTest", async (c)=> {
    const teabagsData = await TeabagModel.query()
    c.status(200)
    
    return c.body(teabagsData)
  })

  app.route("/", teabagsData)
}

export default prepareRoutesTeabags