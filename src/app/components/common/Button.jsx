import React from "react"

const Button = ({ text, onClick, type, className, ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded focus:outline-none focus:shadow-outline ${className}`}
    {...props}
  >
    {text}
  </button>
)

export default Button
