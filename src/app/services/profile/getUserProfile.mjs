import routes from "@/app/api/routes.mjs"

const getUserProfile =
  ({ apiClients }) =>
  async ({ userId, search }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiUser } = apiClients

    if (!apiUser || typeof apiUser.get !== "function") {
      throw new Error("apiUser is not defined or not a function")
    }

    try {
      let data

      if (userId) {
        userId = parseInt(userId)

        if (isNaN(userId)) {
          throw new Error("Invalid user ID")
        }

        ;({ data } = await apiUser.get(routes.apiUser.profile(userId)))
      } else if (search) {
        ;({ data } = await apiUser.get(routes.apiUser.search(search)))
      } else {
        throw new Error("Either userId or search must be provided")
      }

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"
      throw new Error(Array.isArray(error) ? error : [error])
    }
  }

export default getUserProfile
