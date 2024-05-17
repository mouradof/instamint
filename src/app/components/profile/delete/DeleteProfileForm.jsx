// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import Button from "@/app/components/common/Button"
import Toast from "@/app/components/common/Toast"

const DeleteProfileForm = ({ onDelete, loading, message, success }) => {
  const [password, setPassword] = useState("")

  const handleDelete = () => {
    onDelete(password)
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h1>
      {message && <Toast message={message} isSuccess={success} />}
      <p className="mb-6 text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <div className="flex justify-between w-full">
        <Button
          onClick={handleDelete}
          loading={loading}
          text="Delete Account"
          className="bg-red-500 hover:bg-red-600"
        />
        <Button
          // eslint-disable-next-line no-undef
          onClick={() => router.push(`/profile/${session.id}`)}
          text="Cancel"
          className="bg-gray-500 hover:bg-gray-600"
        />
      </div>
    </div>
  )
}

export default DeleteProfileForm
