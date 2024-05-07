import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments, faRetweet, faBars, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const ProfileHeader = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [coverImage, setCoverImage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:4000/api/user/7").then(response => {
      setCoverImage(response.data.coverImage)
    })
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation)
  }

  const handleDeleteAccount = () => {
    axios
      .delete("http://localhost:4000/api/user/7")
      .then(() => {
        alert("User deleted successfully!")
        window.location.href = "/profile/deleted"
      })
      .catch(() => {
        alert("Error deleting user. Please try again later.")
      })
  }

  return (
    <div className="w-full h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${coverImage})` }}>
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
                onClick={() => (window.location.href = "profile/editProfile")}
              >
                Edit Profile
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
  <div className="w-3/4 mt-4 px-4 flex flex-col items-center">
    <div className="flex w-full items-center">
      <img
        src={user.profileImage}
        alt="Profile"
        className="h-24 w-24 rounded-full border-4 border-white bg-white mr-4"
      />
      <div className="flex flex-grow justify-between items-center w-full">
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
    <div className="text-left w-full mt-4">
      <div className="text-2xl font-bold">{user.username}</div>
      <div className="text-sm text-gray-600">{user.bio || "No bio provided."}</div>
    </div>
    <div className="flex w-full justify-center gap-12 mt-4">
      <button className="bg-customGreen text-white font-bold py-2 px-4 rounded-full hover:bg-customGreenDarker transition duration-300 ease-in-out">
        Follow
      </button>
      <button className="bg-transparent text-customGreen font-bold py-2 px-4 rounded-full border-2 border-customGreen hover:bg-customGreen hover:text-white transition duration-300 ease-in-out">
        NFT's
      </button>
    </div>
  </div>
)

const ProfilePosts = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [isImageFullscreen, setImageFullscreen] = useState(false)
  const [liked, setLiked] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleDeletePost = () => {
    alert("Post has been deleted (simulation).")
    setDropdownVisible(false)
  }

  const toggleImageFullscreen = () => {
    setImageFullscreen(!isImageFullscreen)
  }

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="w-3/4 mx-auto bg-white shadow rounded-lg p-4">
      <div className="flex items-center mb-2">
        <img className="w-10 h-10 rounded-full mr-4" src="/images/default-profile-picture.jpg" alt="User avatar" />
        <span className="font-bold text-md">Darrell asidddd</span>
        <div className="ml-auto relative">
          <button onClick={toggleDropdown} className="p-2 rounded hover:bg-gray-200 transition duration-200">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
              <ul>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <button onClick={handleDeletePost} className="flex items-center w-full">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-4">It"s a new day in Cyprus...</div>
      <div className="mt-4 mb-8 cursor-pointer">
        <img
          src="/images/default-profile-picture.jpg"
          alt="Post visual content"
          className="w-1/2 h-auto object-cover rounded-lg shadow"
          onClick={toggleImageFullscreen}
        />
        {isImageFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <button onClick={toggleImageFullscreen} className="absolute top-3 right-3 text-white text-xl">
              &times
            </button>
            <img
              src="/images/default-profile-picture.jpg"
              alt="Post visual content"
              className="max-w-full max-h-full rounded-lg shadow"
            />
          </div>
        )}
      </div>
      <div className="flex justify-around w-full">
        <div className="flex items-center cursor-pointer" onClick={toggleLike}>
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-gray-600 h-4 w-4 mr-1 ${liked ? "text-red-500" : "text-gray-600"}`}
          />
          <span className="text-xs text-gray-600">10k</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => alert("Comment feature coming soon!")}>
          <FontAwesomeIcon icon={faComments} className="text-gray-600 h-4 w-4 mr-1" />
          <span className="text-xs text-gray-600">500</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => alert("You retweeted this post!")}>
          <FontAwesomeIcon icon={faRetweet} className="text-gray-600 h-4 w-4 mr-1" />
          <span className="text-xs text-gray-600">1.3k</span>
        </div>
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    followers: 0,
    following: 0,
    bio: "",
    profileImage: "/images/default-profile-picture.jpg",
    coverImage: "/images/default-cover-picture.jpg"
  })

  useEffect(() => {
    axios.get("http://localhost:4000/api/user/7").then(response => {
      setUser({
        ...user,
        ...response.data
      })
    })
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      <ProfileHeader coverImage={user.coverImage} />
      <ProfileContent user={user} />
      <ProfilePosts />
    </div>
  )
}

export default ProfilePage
