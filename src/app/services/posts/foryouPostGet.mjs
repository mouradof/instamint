import routes from "@/app/api/routes.mjs"

const getForyouPost =
  ({ apiClients }) =>
  async ({ userId, page }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.get !== "function") {
      throw new Error("apiPost is not defined or not a function")
    }

    userId = parseInt(userId)
    page = parseInt(page)

    try {
      const { data } = await apiPost.get(routes.apiPost.post.forYou(userId, page))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      throw new Error[Array.isArray(error) ? error : [error]]()
    }
  }

export default getForyouPost
