import React, { useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const ProfileHeader = ({ user, readOnly }) => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleDeleteAccountRedirect = () => {
    router.push(`/profile/deleteProfile`)
  }

  return (
    <div className="w-full h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${user.coverImage})` }}>
      <div className="absolute top-4 left-4">
        <img src="/images/logo-Instamint.png" alt="Company Logo" className="h-29 w-14" />
      </div>
      {!readOnly && (
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
                  onClick={() => router.push("/profile/changePassword")}
                >
                  Change Password
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteAccountRedirect}>
                  Delete Account
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push("/logout/logout")}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileHeader
