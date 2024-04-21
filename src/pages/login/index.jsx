import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        alert("Vous êtes connecté")
        router.push("/home")
      } else {
        const error = await response.json()
        alert(error.message || "Erreur de connexion")
      }
    } catch (error) {
      alert("Erreur réseau")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            required
            style={{ width: "100%", padding: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            required
            style={{ width: "100%", padding: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button type="submit" disabled={isLoading} style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        Not have an account? <Link href="/register"><a style={{ color: "blue" }}>Register now</a></Link>
      </div>
    </div>
  )
}

export default Login