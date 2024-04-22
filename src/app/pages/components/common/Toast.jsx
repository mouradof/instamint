import React, { useState, useEffect } from "react"

const Toast = ({ message, isSuccess }) => {
    const [isVisible, setIsVisible] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [])
  
    return (
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        } text-white z-50 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {message}
      </div>
    )
  }
  
export default Toast