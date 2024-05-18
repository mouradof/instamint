import React from "react"

const Message = ({ type, text }) => {
  const messageTypeClass = type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"

  return (
    <div className={`p-4 mb-4 text-sm ${messageTypeClass} rounded`} role="alert">
      {text}
    </div>
  )
}

export default Message
