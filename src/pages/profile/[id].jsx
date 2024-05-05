import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments, faRetweet, faBars, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const ProfileHeader = ({ user, handleDeleteAccount }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation)
  }

  return (
    <div className="w-full h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${user.coverImage})` }}>
      <div className="absolute top-4 left-4">
        <img src="/images/logo-Instamint.png" alt="Company Logo" className="h-29 w-14" />
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMenu}
          className="p-2 text-white bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-12 bg-white rounded shadow-lg w-48">
            <ul className="text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => (window.location.href = "editProfile")}
              >
                Edit Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => (window.location.href = "changePassword")}
              >
                Change Password
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleConfirmation}>
                Delete Account
              </li>
            </ul>
          </div>
        )}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="text-xl font-semibold">Are you sure you want to delete your account?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4" onClick={handleDeleteAccount}>
                Delete
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={toggleConfirmation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
const ProfileContent = ({ user }) => (
  <div className="w-3/4 mt-4 px-4 flex flex-col items-start">
    <div className="flex w-full">
      <div className="flex flex-col items-start mr-8">
        <img src={user.profileImage} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white" />
      </div>
      <div className="flex-grow flex justify-around">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{user.followers}</span>
          <span className="text-sm text-gray-600">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{user.following}</span>
          <span className="text-sm text-gray-600">Following</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start mr-8">
      <div className="mt-2">
        <div className="text-xl font-bold">{user.username}</div>
        <div className="text-sm text-gray-600">{user.bio || "No bio provided."}</div>
      </div>
    </div>
    <hr className="w-full mt-4" />
  </div>
)

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        const storedUser = JSON.parse(userData)
        if (storedUser) {
          setUser(storedUser)
        }
      } else {
        console.error("No user data available. User might not be logged in.")
        router.push("/login")
      }
    }
  }, [router])

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:4000/api/user/${user.id}`)
      .then(response => {
        alert("User deleted successfully!")
        localStorage.removeItem("user")
        router.push("/login")
      })
      .catch(error => {
        console.error("Error deleting user:", error)
        alert("Error deleting user. Please try again later.")
      })
  }

  return (
    <div className="flex flex-col items-center w-full">
      {user ? (
        <>
          <ProfileHeader user={user} handleDeleteAccount={handleDeleteAccount} />
          <ProfileContent user={user} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}

export default ProfilePage
