import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useAppContext from "@/app/hooks/useContext.jsx"
import EditProfileForm from "@/app/components/profile/edit/EditProfileForm"
import Countdown from "@/app/components/profile/edit/Countdown"

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
  const router = useRouter()
  const {
    state: { session },
    action: { updateUserProfile, getUserProfile }
  } = useAppContext()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = session.id

        if (!userId) {
          throw new Error("No user ID found")
        }

        const [error, data] = await getUserProfile({ userId })

        if (error) {
          throw new Error(error)
        }

        setUser({
          username: data.username,
          bio: data.bio,
          profileImage: data.profileImage || "",
          coverImage: data.coverImage || ""
        })
      } catch {
        router.push("/login")
      }
    }

    if (session) {
      fetchUserData()
    }
  }, [session, getUserProfile, router])

  const handleInputChange = e => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e, type) => {
    const file = e.target.files[0]
    setUser(prev => ({
      ...prev,
      [type]: file
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("username", user.username)
    formData.append("bio", user.bio)

    if (user.profileImage instanceof File) {
      formData.append("profileImage", user.profileImage)
    }

    if (user.coverImage instanceof File) {
      formData.append("coverImage", user.coverImage)
    }

    try {
      const userId = session.id
      const [error, data] = await updateUserProfile({ userId, userData: formData })

      if (error) {
        throw new Error(error)
      }

      setMessage({ text: "Profile updated successfully!", type: "success" })
      setSuccess(true)
      localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), ...data }))

      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(countdownInterval)
        router.push(`/profile/${userId}`)
      }, 5000)
    } catch (error) {
      setMessage({ text: error.message || "Failed to update profile. Please try again.", type: "error" })
      setLoading(false)
    }
  }

  const handleCancel = () => {
    const userId = session.id
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Edit Profile</h1>
        {!success ? (
          <EditProfileForm
            user={user}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            loading={loading}
            message={message}
            handleCancel={handleCancel}
          />
        ) : (
          <Countdown countdown={countdown} setCountdown={setCountdown} userId={session.id} />
        )}
      </div>
    </div>
  )
}

export default EditProfile
