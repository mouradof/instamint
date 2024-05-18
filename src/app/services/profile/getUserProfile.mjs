import routes from "@/app/api/routes.mjs"

const getUserProfile =
  ({ apiClients }) =>
  async ({ userId }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiUser } = apiClients

    if (!apiUser || typeof apiUser.get !== "function") {
      throw new Error("apiUser is not defined or not a function")
    }

    userId = parseInt(userId)

    try {
      const { data } = await apiUser.get(routes.apiUser.profile(userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"
      throw new Error(Array.isArray(error) ? error : [error])
    }
  }

export default getUserProfile
