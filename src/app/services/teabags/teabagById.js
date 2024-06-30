import routes from "@/app/api/routes.mjs"

const getTeabagById =
  ({ apiClients }) =>
  async ({ teabagId }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiRelation } = apiClients

    if (!apiRelation || typeof apiRelation.get !== "function") {
      throw new Error("apiRelation is not defined or not a function")
    }

    try {
      const { data } = await apiRelation.get(routes.apiRelation.teabags.teabagById(teabagId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"
      throw new Error(Array.isArray(error) ? error : [error])
    }
  }

export default getTeabagById
