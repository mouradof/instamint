import React, { useState } from "react"
import Message from "./Message"

const EditProfileForm = ({
  user,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  loading,
  message,
  handleCancel,
  handleUseDefaultImagesChange
}) => {
  const [errorMessage, setErrorMessage] = useState("")

  const validateImage = file => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"]

    return validTypes.includes(file.type)
  }

  const handleImageChangeWithValidation = (e, imageType) => {
    const file = e.target.files[0]

    if (file && !validateImage(file)) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, GIF).")
      e.target.value = null

      return
    }

    setErrorMessage("")
    handleImageChange(e, imageType)
  }

  return (
    <>
      {message && <Message type={message.type} text={message.text} />}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{errorMessage}</span>
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
        <div className="flex items-center">
          <input
            id="useDefaultImages"
            type="checkbox"
            name="useDefaultImages"
            checked={user.useDefaultImages}
            onChange={handleUseDefaultImagesChange}
            className="mr-2"
          />
          <label htmlFor="useDefaultImages" className="text-sm font-medium text-gray-700">
            Use Default Images
          </label>
        </div>
        {!user.useDefaultImages && (
          <>
            <div className="flex flex-col">
              <label htmlFor="profileImage" className="text-sm font-medium text-gray-700">
                Profile Image:
              </label>
              <input
                id="profileImage"
                type="file"
                name="profileImage"
                onChange={e => handleImageChangeWithValidation(e, "profileImage")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="coverImage" className="text-sm font-medium text-gray-700">
                Cover Image:
              </label>
              <input
                id="coverImage"
                type="file"
                name="coverImage"
                onChange={e => handleImageChangeWithValidation(e, "coverImage")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}
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
  )
}

export default EditProfileForm
