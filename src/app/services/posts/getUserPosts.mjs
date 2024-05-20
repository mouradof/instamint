const getUserPosts =
  ({ apiClients }) =>
  async ({ userId }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.get !== "function") {
      throw new Error("apiPost is not defined or not a function")
    }

    userId = parseInt(userId)

    try {
      const { data } = await apiPost.get(`/post/user/${userId}`)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error], null]
    }
  }

export default getUserPosts
