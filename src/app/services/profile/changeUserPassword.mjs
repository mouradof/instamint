const changeUserPassword =
  ({ apiClients }) =>
  async ({ idUser, oldPassword, newPassword }) => {
    try {
      const response = await apiClients.apiUser.put(`/api/user/${idUser}/change-password`, {
        oldPassword,
        newPassword
      })

      return [null, response.data]
    } catch (error) {
      return [error.response?.data?.message || "Failed to change password", null]
    }
  }

export default changeUserPassword
