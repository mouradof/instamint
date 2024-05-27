import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SuperAdminPage = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filterRole, setFilterRole] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/superadmin')  // Utilisez le chemin complet de l'API
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('session')
    router.push('/login')
  }

  const handleFilterChange = (event) => {
    const role = event.target.value
    setFilterRole(role)
    if (role) {
      setFilteredUsers(users.filter(user => user.role === role))
    } else {
      setFilteredUsers(users)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bonjour Super Admin</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Se déconnecter</button>
      <div className="mt-4">
        <label htmlFor="roleFilter" className="block mb-2">Filtrer par rôle :</label>
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
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SuperAdminPage
