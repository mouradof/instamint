import React, { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import useAppContext from "@/app/hooks/useContext.jsx"
import ConfirmationModal from "../common/ConfirmationModal"
import Toast from "../common/Toast.jsx"

const Comment = ({ comment, onCommentUpdated, onCommentDeleted }) => {
  const { username, content, createdAt, profileImage, id, userId, postId } = comment
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true
  })

  const {
    state: { session }
  } = useAppContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [alert, setAlert] = useState(null)

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4002/post/${postId}/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.id, postId, content: editContent })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "Failed to update comment")
      }

      const updatedComment = await response.json()
      onCommentUpdated(updatedComment)
      setIsEditing(false)
      setAlert({ message: "Comment updated successfully!", type: "success" })
    } catch (error) {
      setAlert({ message: error.message, type: "error" })
    }
  }

  const handleDelete = () => {
    setShowConfirmation(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4002/post/${postId}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.id }) // Assurez-vous que userId est inclus
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "Failed to delete comment")
      }

      onCommentDeleted(id)
      setAlert({ message: "Comment deleted successfully!", type: "success" })
    } catch (error) {
      setAlert({ message: error.message, type: "error" })
    } finally {
      setShowConfirmation(false)
    }
  }

  return (
    <div className="border-b border-gray-200 px-4 py-2 bg-white flex space-x-3">
      <div className="min-w-0 flex-shrink-0">
        <img src={profileImage} alt="Profile image" width={40} height={40} className="rounded-full" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h4 className="font-bold text-black text-sm">{username}</h4>
            <span className="text-gray-500 text-xs ml-2">{formattedTime}</span>
          </div>
          {session.id === userId && (
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 text-xs">
                Edit
              </button>
              <button onClick={handleDelete} className="text-red-500 text-xs">
                Delete
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="flex flex-col">
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex space-x-2 mt-2">
              <button onClick={handleEdit} className="bg-blue-500 text-white px-2 py-1 rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-800">{content}</p>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this comment?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {alert && <Toast message={alert.message} isSuccess={alert.type === "success"} />}
    </div>
  )
}

export default Comment
