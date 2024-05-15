import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const EditProfile = () => {
  const [user, setUser] = useState({
    username: "",
    bio: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const userObj = JSON.parse(userData)
        setUser({
          username: userObj.username,
          bio: userObj.bio
        })
      } else {
        router.push("/login")
      }
    }
  }, [router])

  const handleInputChange = e => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/${JSON.parse(localStorage.getItem("user")).id}`,
        user
      )
      setMessage({ text: "Profile updated successfully!", type: "success" })
      setSuccess(true)
      localStorage.setItem("user", JSON.stringify({ ...user, ...response.data }))

      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(countdownInterval)
        router.push(`/profile/${JSON.parse(localStorage.getItem("user")).id}`)
      }, 5000)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage({ text: "Username already exists. Please choose another.", type: "error" })
      } else {
        setMessage({ text: "Failed to update profile. Please try again.", type: "error" })
      }
      console.error("Error updating profile:", error)
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
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Edit Profile</h1>
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
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  Bio:
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
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
                  {loading ? "Updating..." : "Update Profile"}
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
              Your profile has been updated. You will be redirected to your profile page in {countdown} seconds.
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

export default EditProfile
