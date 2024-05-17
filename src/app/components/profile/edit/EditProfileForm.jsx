import React from "react"
import ProfileImageOptions from "./ProfileImageOptions"
import CoverImageOptions from "./CoverImageOptions"
import Message from "./Message"

const EditProfileForm = ({
  user,
  handleInputChange,
  handleSubmit,
  loading,
  message,
  profileImageOption,
  setProfileImageOption,
  coverImageOption,
  setCoverImageOption,
  handleCancel
}) => (
  <>
    {message && <Message type={message.type} text={message.text} />}
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
      <ProfileImageOptions option={profileImageOption} setOption={setProfileImageOption} />
      <CoverImageOptions option={coverImageOption} setOption={setCoverImageOption} />
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
          // eslint-disable-next-line no-undef
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </>
)

export default EditProfileForm
