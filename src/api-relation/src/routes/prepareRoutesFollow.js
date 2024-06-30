import FollowModel from "../db/models/FollowModel.js"

const prepareRoutesFollow = ({ app }) => {
  app.post("/follow/:userId", async c => {
    const followerId = c.req.user.id // Assurez-vous d'avoir l'utilisateur connecté
    const followedId = c.req.param("userId")

    await FollowModel.query().insert({ followerId, followedId })

    return c.json({ message: "Followed successfully" })
  })

  app.delete("/unfollow/:userId", async c => {
    const followerId = c.req.user.id // Assurez-vous d'avoir l'utilisateur connecté
    const followedId = c.req.param("userId")

    await FollowModel.query().delete().where({ followerId, followedId })

    return c.json({ message: "Unfollowed successfully" })
  })
}

export default prepareRoutesFollow
