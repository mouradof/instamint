import React, { useState } from "react"
import { useRouter } from "next/router"

function DeleteUserButton() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    setLoading(true)
    fetch("http://localhost:4000/api/user/1", {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
      })
      .then(() => {
        alert("User deleted successfully!")
        setShowConfirmation(false)
        router.push("/profile")
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? "Deleting..." : "Delete User"}
      </button>
      {showConfirmation && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="absolute bg-white rounded-lg p-8 max-w-md w-full mx-auto">
            <p className="text-xl font-semibold mb-4">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}

export default DeleteUserButton
