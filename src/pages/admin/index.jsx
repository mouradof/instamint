import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [banDuration, setBanDuration] = useState("")
  const [showModal, setShowModal] = useState(false)
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
        // eslint-disable-next-line no-undef
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

  const handleBanDurationChange = event => {
    setBanDuration(event.target.value)
  }

  const handleBanSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/admin/ban/${selectedUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ duration: banDuration })
      })

      if (!response.ok) {
        throw new Error("Failed to ban user")
      }

      setShowModal(false)
      setBanDuration("")
    } catch (error) {
      // eslint-disable-next-line no-undef
      setErrorMessage("Failed to ban user: " + error.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
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
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleBanUser(user)}>
                  Ban User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Ban {selectedUser.username}</h2>
            <label htmlFor="banDuration" className="block mb-2">
              Duration:
            </label>
            <select
              id="banDuration"
              value={banDuration}
              onChange={handleBanDurationChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select duration</option>
              <option value="10m">10 minutes</option>
              <option value="12h">12 hours</option>
              <option value="24h">24 hours</option>
              <option value="1w">1 week</option>
              <option value="1m">1 month</option>
              <option value="forever">Forever</option>
            </select>
            <div className="mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleBanSubmit}>
                Ban User
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
