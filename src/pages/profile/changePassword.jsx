import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login")
      }
    }
  }, [router])

  const handleChange = e => {
    const { name, value } = e.target
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" })
      setLoading(false)
      return
    }

    const userId = JSON.parse(localStorage.getItem("user"))?.id
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${userId}/change-password`, {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      })
      setMessage({ text: response.data.message, type: "success" })
      setSuccess(true)

      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(countdownInterval)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.push("/login")
      }, 5000)
    } catch (error) {
      console.error("Error updating password:", error)
      setMessage({ text: "Failed to update password. Please try again.", type: "error" })
      setLoading(false)
    }
  }

  const handleCancel = () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Change Password</h1>
        {!success ? (
          <>
            {message && (
              <div
                className={`mb-4 p-4 rounded ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                  Old Password:
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                  New Password:
                </label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password:
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Change Password"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="mb-6 text-gray-700">
              Your password has been updated. You will be redirected to the login page in {countdown} seconds.
            </p>
            <div className="relative w-full h-4 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-4 bg-blue-500 rounded transition-width duration-1000"
                style={{ width: `${(5 - countdown) * 20}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChangePassword
