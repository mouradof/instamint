import React, { useEffect, useRef } from "react"
import { FlagIcon } from "@heroicons/react/24/outline"

const PostOptionsPopup = ({ onReportClick }) => {
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onReportClick(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onReportClick])

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
      <button
        onClick={() => onReportClick(true)}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FlagIcon className="h-5 w-5 inline-block align-middle text-gray-700" />
        <span className="align-middle"> Report </span>
      </button>
    </div>
  )
}

export default PostOptionsPopup
