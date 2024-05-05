import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      if (response.ok) {
        alert("Inscription réussie. Veuillez vérifier votre e-mail.")
        router.push("/login")
      } else {
        alert("Erreur d'inscription")
      }
    } catch (error) {
      alert("Erreur réseau")
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Username"
            style={{ width: "100%", padding: "10px" }}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            style={{ width: "100%", padding: "10px" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Password"
            style={{ width: "100%", padding: "10px" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Register
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login">
          <a style={{ color: "blue" }}>Login here</a>
        </Link>
      </div>
    </div>
  )
}

export default Register
