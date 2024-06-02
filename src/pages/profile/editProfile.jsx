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
  const [profileImageOption, setProfileImageOption] = useState("current")
  const [coverImageOption, setCoverImageOption] = useState("current")
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

  useEffect(() => {
    if (profileImageOption === "random") {
      setUser(prev => ({
        ...prev,
        profileImage: `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${Math.floor(Math.random() * 1000)}.jpg`
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
        coverImage: `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${Math.floor(Math.random() * 1000)}.jpg`
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
      const userId = session.id
      const [error, data] = await updateUserProfile({ userId, userData: user })

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
            handleSubmit={handleSubmit}
            loading={loading}
            message={message}
            profileImageOption={profileImageOption}
            setProfileImageOption={setProfileImageOption}
            coverImageOption={coverImageOption}
            setCoverImageOption={setCoverImageOption}
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
