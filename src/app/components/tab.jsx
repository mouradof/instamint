import React from "react"

const Tab = ({ title, isActive, onClick }) => (
  <button
    className={`px-4 py-2 pt-4 font-semibold text-sm ${isActive ? "text-green-500 border-b-4 border-green-500" : "text-gray-500"}`}
    onClick={onClick}
  >
    {title}
  </button>
)

export default Tab
