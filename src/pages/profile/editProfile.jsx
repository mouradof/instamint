import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const EditProfile = () => {
  const [user, setUser] = useState({
    username: "",
    bio: "",
    profileImage: "",
    coverImage: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [profileImageOption, setProfileImageOption] = useState("current")
  const [coverImageOption, setCoverImageOption] = useState("current")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const userObj = JSON.parse(userData)
        setUser({
          username: userObj.username,
          bio: userObj.bio,
          profileImage: userObj.profileImage || "",
          coverImage: userObj.coverImage || ""
        })
      } else {
        router.push("/login")
      }
    }
  }, [router])

  useEffect(() => {
    if (profileImageOption === "random") {
      setUser(prev => ({
        ...prev,
        profileImage: `https://source.unsplash.com/random/400x400?sig=${Math.floor(Math.random() * 1000)}`
      }))
    } else if (profileImageOption === "default") {
      setUser(prev => ({
        ...prev,
        profileImage: "/images/default-profile-picture.jpg"
      }))
    } else {
      setUser(prev => ({
        ...prev,
        profileImage: JSON.parse(localStorage.getItem("user")).profileImage || ""
      }))
    }
  }, [profileImageOption])

  useEffect(() => {
    if (coverImageOption === "random") {
      setUser(prev => ({
        ...prev,
        coverImage: `https://source.unsplash.com/random/1200x400?sig=${Math.floor(Math.random() * 1000)}`
      }))
    } else if (coverImageOption === "default") {
      setUser(prev => ({
        ...prev,
        coverImage: "/images/default-cover-picture.jpg"
      }))
    } else {
      setUser(prev => ({
        ...prev,
        coverImage: JSON.parse(localStorage.getItem("user")).coverImage || ""
      }))
    }
  }, [coverImageOption])

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
      localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), ...response.data }))

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
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2">Profile Image:</label>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="profileImageOption"
                      value="current"
                      checked={profileImageOption === "current"}
                      onChange={() => setProfileImageOption("current")}
                      className="hidden"
                      id="profile-current"
                    />
                    <label htmlFor="profile-current" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${profileImageOption === "current" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {profileImageOption === "current" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Current</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="profileImageOption"
                      value="random"
                      checked={profileImageOption === "random"}
                      onChange={() => setProfileImageOption("random")}
                      className="hidden"
                      id="profile-random"
                    />
                    <label htmlFor="profile-random" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${profileImageOption === "random" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {profileImageOption === "random" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Random</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="profileImageOption"
                      value="default"
                      checked={profileImageOption === "default"}
                      onChange={() => setProfileImageOption("default")}
                      className="hidden"
                      id="profile-default"
                    />
                    <label htmlFor="profile-default" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${profileImageOption === "default" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {profileImageOption === "default" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Default</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2">Cover Image:</label>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="coverImageOption"
                      value="current"
                      checked={coverImageOption === "current"}
                      onChange={() => setCoverImageOption("current")}
                      className="hidden"
                      id="cover-current"
                    />
                    <label htmlFor="cover-current" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${coverImageOption === "current" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {coverImageOption === "current" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Current</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="coverImageOption"
                      value="random"
                      checked={coverImageOption === "random"}
                      onChange={() => setCoverImageOption("random")}
                      className="hidden"
                      id="cover-random"
                    />
                    <label htmlFor="cover-random" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${coverImageOption === "random" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {coverImageOption === "random" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Random</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="coverImageOption"
                      value="default"
                      checked={coverImageOption === "default"}
                      onChange={() => setCoverImageOption("default")}
                      className="hidden"
                      id="cover-default"
                    />
                    <label htmlFor="cover-default" className="flex items-center cursor-pointer">
                      <span
                        className={`mr-2 w-4 h-4 inline-block rounded-full border-2 ${coverImageOption === "default" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {coverImageOption === "default" && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </span>
                      <span className="text-sm text-gray-700">Default</span>
                    </label>
                  </div>
                </div>
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
              Your profile has been updated. You will be redirected to your profile page in {countdown} seconds
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
