import React from "react"
import Comment from "./Comment"

const CommentList = ({ comments, onCommentUpdated, onCommentDeleted }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onCommentUpdated={onCommentUpdated}
          onCommentDeleted={onCommentDeleted}
        />
      ))}
    </div>
  )
}

export default CommentList
