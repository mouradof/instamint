import routes from "@/app/api/routes.mjs"

const deletePost =
  ({ apiClients }) =>
  async ({ postId, userId }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.delete !== "function") {
      throw new Error("apiPost is not defined or not a function")
    }

    postId = parseInt(postId)

    try {
      const { data } = await apiPost.delete(routes.apiPost.post.deletePost(postId, userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      throw new Error[Array.isArray(error) ? error : [error]]()
    }
  }

export default deletePost
