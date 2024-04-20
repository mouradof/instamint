import React, { useState } from "react"
import { useRouter } from "next/router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter() // Correct hook from Next.js

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        alert("Vous êtes connecté") // Alert user
        router.push("/home") // Correct method to navigate
      } else {
        alert("Erreur de connexion") // Error alert
      }
    } catch (error) {
      alert("Erreur réseau") // Network error alert
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
      </div>
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email"
              style={{ width: "100%", padding: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              style={{ width: "100%", padding: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
              Login
            </button>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          Not have an account? <a href="/register" style={{ color: "blue" }}>Register now</a>
        </div>
      </div>
    </div>
  )
}

export default Login
