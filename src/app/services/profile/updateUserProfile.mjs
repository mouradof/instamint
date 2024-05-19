import routes from "@/app/api/routes.mjs"

const updateUserProfile =
  ({ apiClients }) =>
  async ({ userId, userData }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiUser } = apiClients

    if (!apiUser || typeof apiUser.put !== "function") {
      throw new Error("apiUser is not defined or not a function")
    }

    userId = parseInt(userId)

    try {
      const { data } = await apiUser.put(routes.apiUser.updateProfile(userId), userData)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"
      throw new Error(Array.isArray(error) ? error.join(", ") : error)
    }
  }

export default updateUserProfile
