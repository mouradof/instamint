import React, { useState } from "react"

const CommentForm = ({ postId, userId, onCommentAdded }) => {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:4002/post/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, content }) // Assurez-vous que userId est défini correctement
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error)

        return
      }

      const newComment = await response.json()
      onCommentAdded(newComment)
      setContent("")
      setSuccess("Comment added successfully!")
    } catch (error) {
      setError("Failed to add comment")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  )
}

export default CommentForm
