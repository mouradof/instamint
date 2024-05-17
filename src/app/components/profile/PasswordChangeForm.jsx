import React from "react"

const PasswordChangeForm = ({ passwords, handleChange, handleSubmit, handleCancel, loading }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
        Old Password:
      </label>
      <input
        id="oldPassword"
        type="password"
        name="oldPassword"
        value={passwords.oldPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
        New Password:
      </label>
      <input
        id="newPassword"
        type="password"
        name="newPassword"
        value={passwords.newPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
        Confirm New Password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={passwords.confirmPassword}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <div className="flex justify-between">
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Change Password"}
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
)

export default PasswordChangeForm
