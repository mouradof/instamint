import routes from "@/app/api/routes.mjs"

const createUserTeabag =
  ({ apiClients }) =>
  async ({ idUser, formData }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiRelation } = apiClients

    if (!apiRelation || typeof apiRelation.get !== "function") {
      throw new Error("apiRelation is not defined or not a function")
    }

    idUser = parseInt(idUser)

    try {
      const { data } = await apiRelation.post(routes.apiRelation.teabags.userCreateTeabag(idUser), formData)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      throw new Error(Array.isArray(error) ? error.join(", ") : error)
    }
  }

export default createUserTeabag
