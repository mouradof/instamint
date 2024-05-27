import React, { useEffect, useRef } from "react"
import { FlagIcon, TrashIcon } from "@heroicons/react/24/outline"

const PostOptionsPopup = ({ onReportClick, onDeleteClick, isAuthor }) => {
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
    <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <button
        onClick={() => onReportClick(true)}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <FlagIcon className="h-5 w-5 inline-block align-middle text-gray-700" />
        <span className="align-middle"> Report </span>
      </button>
      {isAuthor && (
        <button
          onClick={onDeleteClick}
          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
        >
          <TrashIcon className="h-5 w-5 inline-block align-middle text-red-500" />
          <span className="align-middle"> Delete </span>
        </button>
      )}
    </div>
  )
}

export default PostOptionsPopup
