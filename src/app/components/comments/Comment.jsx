import React from "react"
import { formatDistanceToNow } from "date-fns"

const Comment = ({ comment }) => {
  const { username, content, createdAt, profileImage } = comment
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true
  })

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
        </div>
        <p className="text-sm text-gray-800">{content}</p>
      </div>
    </div>
  )
}

export default Comment
