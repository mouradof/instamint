import React, { useState, useEffect } from "react"
import Comment from "./Comment"

const CommentList = ({ postId, comments }) => {
  const [fetchedComments, setFetchedComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4002/post/${postId}/comments`)
        const data = await response.json()

        if (Array.isArray(data)) {
          setFetchedComments(data)
        } else {
          setFetchedComments([])
        }
      } catch (error) {
        setError("Failed to fetch comments")
      }
    }

    fetchComments()
  }, [postId])

  const combinedComments = [...comments, ...fetchedComments]

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
      )}
      {combinedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentList
