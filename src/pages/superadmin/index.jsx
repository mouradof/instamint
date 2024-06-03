import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const SuperAdminPage = () => {
  const [users, setUsers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filterRole, setFilterRole] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showPostsModal, setShowPostsModal] = useState(false)
  const [showBanModal, setShowBanModal] = useState(false)
  const [userPosts, setUserPosts] = useState([])
  const [banDuration, setBanDuration] = useState("")
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
        setFilteredUsers(data)
      } catch (error) {
        setAlertMessage("Failed to fetch users: " + error.message)
        setAlertType("error")
      }
    }

    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setAlertMessage("Role updated successfully")
      setAlertType("success")
      setTimeout(() => {
        setAlertMessage("")
        setAlertType("")
      }, 3000)
    } catch (error) {
      setAlertMessage("Failed to update role: " + error.message)
      setAlertType("error")
    }
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
      setFilteredUsers(updatedUsers)
    } catch (error) {
      setAlertMessage("Failed to ban user: " + error.message)
      setAlertType("error")
    }
  }

  const handleUnbanUser = async user => {
    try {
      const response = await fetch(`http://localhost:4000/admin/unban/${user.id}`, {
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

      const updatedUsers = users.map(u => (u.id === user.id ? { ...u, isBanned: false, bannedUntil: null } : u))
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
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

  const filteredAndSortedUsers = users.filter(user =>
    filterRole === "banned" ? user.isBanned : filterRole === "notBanned" ? !user.isBanned : true
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello Super Admin</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
      <div className="mt-4">
        <label htmlFor="roleFilter" className="block mb-2">
          Filter by role:
        </label>
        <select
          id="roleFilter"
          value={filterRole}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="role_user">User</option>
          <option value="role_admin">Admin</option>
          <option value="role_superadmin">Super Admin</option>
          <option value="banned">Banned</option>
          <option value="notBanned">Not Banned</option>
        </select>
      </div>
      {alertMessage && (
        <div
          className={`mt-4 p-4 rounded ${alertType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {alertMessage}
        </div>
      )}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.map(user => (
            <tr key={user.id} className="cursor-pointer">
              <td className="py-2 px-4 border-b" onClick={() => handleViewPosts(user)}>
                {user.id}
              </td>
              <td className="py-2 px-4 border-b" onClick={() => handleViewPosts(user)}>
                {user.username}
              </td>
              <td className="py-2 px-4 border-b" onClick={() => handleViewPosts(user)}>
                {user.email}
              </td>
              <td className="py-2 px-4 border-b" onClick={() => handleViewPosts(user)}>
                {user.role}
              </td>
              <td className="py-2 px-4 border-b" onClick={() => handleViewPosts(user)}>
                {user.isBanned ? "Banned" : "Not Banned"}
              </td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleRoleChange(user)}>
                  Change Role
                </button>
                {user.isBanned ? (
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUnbanUser(user)}>
                    Unban
                  </button>
                ) : (
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleBanUser(user)}>
                    Ban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Change role of {selectedUser.username}</h2>
            <label htmlFor="newRole" className="block mb-2">
              New role:
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
                Save
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

      {showPostsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Posts by {selectedUser?.username}</h2>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post.id} className="mb-4 p-4 border rounded">
                  <p>
                    <strong>ID:</strong> {post.id}
                  </p>
                  <p>
                    <strong>Description:</strong> {post.description}
                  </p>
                  <img src={post.imageUrl} alt="Post Image" className="mt-2 w-full h-auto" />
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
            <div className="flex justify-end">
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

export default SuperAdminPage
