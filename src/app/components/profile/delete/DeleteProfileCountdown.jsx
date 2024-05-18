// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"

// eslint-disable-next-line no-unused-vars
const DeleteProfileCountdown = ({ countdown, setCountdown }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [setCountdown])

  return null
}

export default DeleteProfileCountdown
