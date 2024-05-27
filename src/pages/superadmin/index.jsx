import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const SuperAdminPage = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filterRole, setFilterRole] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/superadmin")

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (error) {
        setErrorMessage("Failed to fetch users: " + error.message)
      }
    }

    fetchUsers()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("session")
    router.push("/login")
  }

  const handleFilterChange = event => {
    const role = event.target.value
    setFilterRole(role)

    if (role) {
      setFilteredUsers(users.filter(user => user.role === role))
    } else {
      setFilteredUsers(users)
    }
  }

  const handleRoleChange = user => {
    setSelectedUser(user)
    setNewRole(user.role)
    setShowModal(true)
  }

  const handleSaveRole = async () => {
    try {
      const response = await fetch(`http://localhost:4000/superadmin/${selectedUser.id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) {
        throw new Error("Failed to update role")
      }

      const updatedUser = await response.json()
      const updatedUsers = users.map(user => (user.id === updatedUser.id ? updatedUser : user))
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers.filter(user => !filterRole || user.role === filterRole))
      setShowModal(false)
      setSelectedUser(null)
    } catch (error) {
      setErrorMessage("Failed to update role: " + error.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bonjour Super Admin</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Se déconnecter
      </button>
      <div className="mt-4">
        <label htmlFor="roleFilter" className="block mb-2">
          Filtrer par rôle :
        </label>
        <select
          id="roleFilter"
          value={filterRole}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Tous</option>
          <option value="role_user">User</option>
          <option value="role_admin">Admin</option>
          <option value="role_superadmin">Super Admin</option>
        </select>
      </div>
      {errorMessage && <div className="bg-red-100 text-red-700 p-2 rounded mt-4">{errorMessage}</div>}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleRoleChange(user)}>
                  Changer le rôle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Changer le rôle de {selectedUser.username}</h2>
            <label htmlFor="newRole" className="block mb-2">
              Nouveau rôle :
            </label>
            <select
              id="newRole"
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="role_user">User</option>
              <option value="role_admin">Admin</option>
              <option value="role_superadmin">Super Admin</option>
            </select>
            <div className="mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSaveRole}>
                Enregistrer
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminPage
