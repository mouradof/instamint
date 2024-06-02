import React from "react"

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
