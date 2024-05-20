import routes from "@/app/api/routes.mjs"

const postReportPost =
  ({ apiClients }) =>
  async ({ postId, userId, reason }) => {
    if (!apiClients) {
      throw new Error("apiClients is not defined yet")
    }

    const { apiPost } = apiClients

    if (!apiPost || typeof apiPost.post !== "function") {
      throw new Error("apiPost is not defined or not a function")
    }

    postId = parseInt(postId)

    try {
      const { data } = await apiPost.post(routes.apiPost.report.report(postId, userId), { reason })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      throw new Error[Array.isArray(error) ? error : [error]]()
    }
  }

export default postReportPost
