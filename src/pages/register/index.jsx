import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "../../app/styles/Login.module.css"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [step, setStep] = useState(1)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
  }

  const handleImageChange = e => {
    const { name, files } = e.target

    if (name === "profileImage") {
      setProfileImage(files[0])
    } else if (name === "coverImage") {
      setCoverImage(files[0])
    }
  }

  const handleNextStep = () => {
    if (!username || !bio) {
      setErrorMessage("Please fill in all fields.")

      return
    }

    setErrorMessage("")
    setStep(2)
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      setIsLoading(false)

      return
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol.")
      setIsLoading(false)

      return
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.")
      setIsLoading(false)

      return
    }

    setEmailError("")
    setErrorMessage("")

    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("bio", bio)
    formData.append("profileImage", profileImage || "default_profile_image.png")
    formData.append("coverImage", coverImage || "default_cover_image.png")

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        setSuccessMessage("Registration successful. Please check your email.")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        const error = await response.json()
        setErrorMessage(error.message || "Registration error.")
      }
    } catch (error) {
      setErrorMessage("Network error.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <img className={styles.logo} src="/images/logo-Instamint.png" />
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
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
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                className={styles.input}
              ></textarea>
            </div>
            <div>
              <input type="file" name="profileImage" onChange={handleImageChange} className={styles.input} />
              <small className={styles.passwordHint}>You can leave it empty to use the default profile image.</small>
            </div>
            <div>
              <input type="file" name="coverImage" onChange={handleImageChange} className={styles.input} />
              <small className={styles.passwordHint}>You can leave it empty to use the default cover image.</small>
            </div>
            <button type="button" onClick={handleNextStep} className={styles.btnlogin}>
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
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
                Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol.
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
                Already have an account?{" "}
                <Link href="/login">
                  <span className={styles.secondTextBottomContainerLogin}>Login here</span>
                </Link>
              </div>
              <button type="button" onClick={handlePrevStep} className={styles.btnlogin}>
                Previous
              </button>
              <button className={styles.btnlogin} type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

Register.isPublicPage = true

export default Register
