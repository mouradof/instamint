import React, { useState, useRef } from "react"
import Link from "next/link"

const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    profileImage: "/images/default-profile-picture.jpg",
    coverImage: "/images/default-cover-picture.jpg",
  })

  const fileInputRef = useRef(null)
  const coverInputRef = useRef(null)

  // Handles changes to inputs including files for images
  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "profileImage" || name === "coverImage") {
      if (files) {
        const file = files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
          setProfile({ ...profile, [name]: reader.result })
        }
        reader.readAsDataURL(file)
      }
    } else {
      setProfile({ ...profile, [name]: value })
    }
  }

  // Handle clicking on image input fields
  const handleImageClick = (ref) => {
    ref.current?.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-3/4 mt-4 bg-white shadow rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full h-64 mb-4">
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={profile.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-90"
                  onClick={() => handleImageClick(coverInputRef)}
                />
                <input
                  type="file"
                  name="coverImage"
                  ref={coverInputRef}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-32 h-32">
                <div className="relative w-full h-full border-4 border-white rounded-full shadow-lg overflow-hidden cursor-pointer">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-90"
                    onClick={() => handleImageClick(fileInputRef)}
                  />
                  <input
                    type="file"
                    name="profileImage"
                    ref={fileInputRef}
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Add a margin-top here to create space */}
          <div className="flex flex-wrap -mx-2 mt-8">
            {["firstName", "lastName", "email", "phoneNumber", "address"].map((field) => (
              <div key={field} className="px-2 w-full md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="bg-customGreen text-white font-bold py-2 px-4 rounded-full hover:bg-customGreenDarker transition duration-300 ease-in-out"
            >
              Update
            </button>
            <Link href="/profile" passHref>
              <button className="bg-transparent text-customGreen font-bold py-2 px-4 rounded-full border-2 border-customGreen hover:bg-customGreen hover:text-white transition duration-300 ease-in-out">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfilePage
