import routes from "@/app/api/routes.mjs"

const createPost =
  ({ apiClients }) =>
  async ({ userId, formData }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.post !== "function") {
      throw new Error("apiUser is not defined or not a function")
    }

    userId = parseInt(userId)

    try {
      const { data } = await apiPost.post(routes.apiPost.post.createPost(userId), formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"
      throw new Error(Array.isArray(error) ? error.join(", ") : error)
    }
  }

export default createPost
