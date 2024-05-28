import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [banDuration, setBanDuration] = useState("")
  const [showBanModal, setShowBanModal] = useState(false)
  const [showUnbanModal, setShowUnbanModal] = useState(false)
  const [showPostsModal, setShowPostsModal] = useState(false)
  const [userPosts, setUserPosts] = useState([])
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("")
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
        setAlertMessage("Failed to fetch users: " + error.message)
        setAlertType("error")
      }
    }

    fetchUsers()
  }, [])

  const fetchUserPosts = async userId => {
    try {
      const response = await fetch(`http://localhost:4002/post/user/${userId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch user posts")
      }

      const data = await response.json()
      setUserPosts(data)
    } catch (error) {
      setAlertMessage("Failed to fetch user posts: " + error.message)
      setAlertType("error")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("session")
    router.push("/login")
  }

  const handleBanUser = user => {
    setSelectedUser(user)
    setShowBanModal(true)
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

      setShowBanModal(false)
      setBanDuration("")
      setAlertMessage("User banned successfully")
      setAlertType("success")
      setTimeout(() => {
        setAlertMessage("")
        setAlertType("")
      }, 3000)

      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...user, isBanned: true, bannedUntil: banDuration } : user
      )
      setUsers(updatedUsers)
    } catch (error) {
      setAlertMessage("Failed to ban user: " + error.message)
      setAlertType("error")
    }
  }

  const handleUnbanUser = async userId => {
    try {
      const response = await fetch(`http://localhost:4000/admin/unban/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to unban user")
      }

      setAlertMessage("User unbanned successfully")
      setAlertType("success")
      setTimeout(() => {
        setAlertMessage("")
        setAlertType("")
      }, 3000)

      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, isBanned: false, bannedUntil: null } : user
      )
      setUsers(updatedUsers)
    } catch (error) {
      setAlertMessage("Failed to unban user: " + error.message)
      setAlertType("error")
    }
  }

  const handleViewPosts = async user => {
    setSelectedUser(user)
    await fetchUserPosts(user.id)
    setShowPostsModal(true)
  }

  const bannedUsers = users.filter(user => user.isBanned)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={() => setShowUnbanModal(true)}>
            Unban Users
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {alertMessage && (
        <div
          className={`mt-4 p-4 rounded ${alertType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {alertMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} onClick={() => handleViewPosts(user)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.isBanned ? "Banned" : "Not Banned"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleBanUser(user)}>
                    Ban User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showBanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Ban {selectedUser?.username}</h2>
            <label htmlFor="banDuration" className="block mb-2 font-medium">
              Duration:
            </label>
            <select
              id="banDuration"
              value={banDuration}
              onChange={handleBanDurationChange}
              className="p-2 border border-gray-300 rounded w-full mb-4"
            >
              <option value="">Select duration</option>
              <option value="10m">10 minutes</option>
              <option value="12h">12 hours</option>
              <option value="24h">24 hours</option>
              <option value="1w">1 week</option>
              <option value="1m">1 month</option>
              <option value="forever">Forever</option>
            </select>
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleBanSubmit}>
                Ban User
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowBanModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUnbanModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Banned Users</h2>
            <div className="overflow-y-auto h-96">
              <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bannedUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleUnbanUser(user.id)}
                        >
                          Unban
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowUnbanModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPostsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Posts by {selectedUser?.username}</h2>
            <div className="overflow-y-auto h-96">
              {userPosts.length > 0 ? (
                <ul>
                  {userPosts.map(post => (
                    <li key={post.id} className="mb-4 p-4 border rounded-lg">
                      <h3 className="text-lg font-bold">Post ID: {post.id}</h3>
                      <p>Description: {post.description}</p>
                      {post.imageUrl && <img src={post.imageUrl} alt="Post Image" className="mt-2 rounded-lg" />}
                      <p className="text-sm text-gray-500">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No posts available.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowPostsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
