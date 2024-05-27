import React from "react"
import { useRouter } from "next/router"

const AdminPage = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("session")
    router.push("/login")
  }

  return (
    <div>
      <h1>Bonjour Admin</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  )
}

export default AdminPage
