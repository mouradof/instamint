import React from "react"

const DeleteProfileMessage = ({ countdown }) => (
  <>
    <p className="mb-6 text-gray-700">
      Your account has been deleted. You will be redirected to the login page in {countdown} seconds.
    </p>
    <div className="relative w-full h-4 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-4 bg-red-500 rounded transition-width duration-1000"
        style={{ width: `${(5 - countdown) * 20}%` }}
      ></div>
    </div>
  </>
)

export default DeleteProfileMessage
