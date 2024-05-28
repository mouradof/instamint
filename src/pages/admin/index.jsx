import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [banDuration, setBanDuration] = useState("")
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

  const handleBanUser = user => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleSaveBan = async () => {
    try {
      const response = await fetch(`http://localhost:4000/admin/ban/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ banDuration })
      })

      if (!response.ok) {
        throw new Error("Failed to ban user")
      }

      const updatedUser = await response.json()
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)))
      setShowModal(false)
      setSelectedUser(null)
    } catch (error) {
      setErrorMessage("Failed to ban user: " + error.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bonjour Admin</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Se déconnecter
      </button>
      {errorMessage && <div className="bg-red-100 text-red-700 p-2 rounded mt-4">{errorMessage}</div>}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Banned</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.isBanned ? "Yes" : "No"}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleBanUser(user)}>
                  Bannir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Bannir {selectedUser.username}</h2>
            <label htmlFor="banDuration" className="block mb-2">
              Durée du bannissement :
            </label>
            <select
              id="banDuration"
              value={banDuration}
              onChange={e => setBanDuration(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Sélectionnez la durée</option>
              <option value="10min">10 minutes</option>
              <option value="12h">12 heures</option>
              <option value="24h">24 heures</option>
              <option value="1week">1 semaine</option>
              <option value="1month">1 mois</option>
              <option value="permanent">Définitif</option>
            </select>
            <div className="mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSaveBan}>
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

export default AdminPage
