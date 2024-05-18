import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Countdown = ({ countdown, setCountdown, userId }) => {
  const router = useRouter()

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(countdownInterval)
      router.push(`/profile/${userId}`)
    }, countdown * 1000)

    return () => clearInterval(countdownInterval)
  }, [countdown, setCountdown, router, userId])

  return (
    <>
      <p className="mb-6 text-gray-700">
        Your profile has been updated. You will be redirected to your profile page in {countdown} seconds
      </p>
      <div className="relative w-full h-4 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-4 bg-blue-500 rounded transition-width duration-1000"
          style={{ width: `${(5 - countdown) * 20}%` }}
        ></div>
      </div>
    </>
  )
}

export default Countdown
