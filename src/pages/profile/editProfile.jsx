import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

export default function EditUserProfile() {
  const [user, setUser] = useState({
    username: "",
    bio: ""
  })
  const [isLoading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:4000/api/user/1")
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await axios.put("http://localhost:4000/api/user/1", user)

      if (response.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        setSuccess(false)
        throw new Error("Failed to update user")
      }
    } catch (error) {
      setError(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img src="/images/logo-Instamint.png" alt="Logo" className="mr-2 w-14 h-14" />
            <h2 className="text-xl font-semibold">Edit User Profile</h2>
          </div>
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg mb-4">
              User updated successfully!
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4">
              Failed to update user. Please try again later.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-800 font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bio" className="text-gray-800 font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <Link
                href="/profile"
                className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
