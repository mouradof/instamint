import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "../../app/styles/Login.module.css"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const router = useRouter()

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)

      return
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol")
      setIsLoading(false)

      return
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format")
      setIsLoading(false)

      return
    }

    setEmailError("") // Clear any previous email errors

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
        const error = await response.json()
        alert(error.message || "Erreur d'inscription")
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
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
          <small className={styles.passwordHint}>
            Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol
          </small>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.bottomContainerLogin}>
          <div>
            Already have an account? {""}
            <Link href="/login">
              &nbsp;<span className={styles.secondTextBottomContainerLogin}>Login here</span>
            </Link>
          </div>
          <button className={styles.btnlogin} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  )
}

Register.isPublicPage = true

export default Register
