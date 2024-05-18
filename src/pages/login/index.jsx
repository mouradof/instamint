import React, { useState, useEffect } from "react"

import { useRouter } from "next/router"
import Link from "next/link"
import styles from "../../app/styles/Login.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [verifiedMessage, setVerifiedMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (router.query.verified === "true") {
      setVerifiedMessage("Email successfully verified. You can now log in.")
    }
  }, [router.query.verified])

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        alert("Vous êtes connecté")
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token) // Assurez-vous que le token est bien stocké sous la clé "token"
        router.push(`/profile/${data.user.id}`)
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
    <div className={styles.pageContainer}>
      <img className={styles.logo} src="/images/logo-Instamint.png" />
      {verifiedMessage && <div className={styles.verifiedMessage}>{verifiedMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.bottomContainerLogin}>
          <div>
            Not have an account? {""}
            <Link href="/register">
              &nbsp;<span className={styles.secondTextBottomContainerLogin}>Register now</span>
            </Link>
          </div>
          <button className={styles.btnlogin} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
}

Login.isPublicPage = true

export default Login
