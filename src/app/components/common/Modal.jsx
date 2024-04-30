import React from "react"

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative mx-auto my-6">
        <div className="relative bg-white border-2 border-gray-300 shadow-md rounded-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
