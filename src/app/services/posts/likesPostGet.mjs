import routes from "@/app/api/routes.mjs"

const getLikesPost =
  ({ apiClients }) =>
  async ({ postId, userId }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.get !== "function") {
      throw new Error("apiPost is not defined or not a function")
    }

    postId = parseInt(postId)

    try {
      const { data } = await apiPost.get(routes.apiPost.like.likes(postId, userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      throw new Error[Array.isArray(error) ? error : [error]]()
    }
  }

export default getLikesPost
