import React, { useState } from "react"
import Modal from "../common/Modal.jsx"
import useAppContext from "@/app/hooks/useContext.jsx"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

const DeleteModalPost = ({ isOpen, onClose, postId }) => {
  const {
    state: { session },
    action: { deletePost }
  } = useAppContext()

  const [error, setError] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [toast, setToast] = useState({ message: "", isSuccess: true })

  const router = useRouter()

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess })
  }

  const handleDelete = async () => {
    try {
      await deletePost({ userId: session.id, postId })
      setIsDeleted(true)
      showToast("Post deleted successfully! Please wait a few moments...", true)
      setTimeout(() => {
        router.reload()
      }, 2000)
    } catch (err) {
      setError(err.message || "An error occurred while deleting the post.")
      showToast(err.message || "An error occurred while deleting the post.", false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Are you sure you want to delete this post?">
      {!isDeleted ? (
        <div className="text-center">
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Delete
          </button>
          <button onClick={onClose} className="px-4 py-2 ml-4 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancel
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      ) : (
        <div className="text-center p-4">
          {toast.message && (
            <div className={`${toast.isSuccess ? "text-green-500" : "text-red-500"} mb-2`}>
              <CheckIcon className="h-10 w-10 text-green-500 mx-auto" />
              {toast.message}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default DeleteModalPost
