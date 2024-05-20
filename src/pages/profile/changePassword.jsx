import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useAppContext from "@/app/hooks/useContext.jsx"
import Toast from "@/app/components/common/Toast.jsx"
import PasswordChangeForm from "@/app/components/profile/PasswordChangeForm.jsx"
import PasswordChangeSuccessMessage from "@/app/components/profile/PasswordChangeSuccessMessage.jsx"

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()
  const {
    state: { session },
    action: { changePassword }
  } = useAppContext()

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session, router])

  const handleChange = e => {
    const { name, value } = e.target
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "New passwords do not match!", type: "error" })
      setLoading(false)

      return
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

    if (!passwordRegex.test(passwords.newPassword)) {
      setMessage({
        text: "Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol.",
        type: "error"
      })
      setLoading(false)

      return
    }

    try {
      const [error, response] = await changePassword({
        idUser: session.id,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      })

      if (error) {
        setMessage({ text: error, type: "error" })
        setLoading(false)

        return
      }

      setMessage({ text: response.message, type: "success" })
      setSuccess(true)

      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(countdownInterval)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.push("/login")
      }, 5000)
    } catch (error) {
      setMessage({ text: "Failed to update password. Please try again.", type: "error" })
      setLoading(false)
    }
  }

  const handleCancel = () => {
    const userId = session?.id
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Change Password</h1>
        {!success ? (
          <>
            {message && (
              <div
                className={`mb-4 p-4 rounded ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
              >
                {message.text}
              </div>
            )}
            <PasswordChangeForm
              passwords={passwords}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              loading={loading}
            />
          </>
        ) : (
          <PasswordChangeSuccessMessage countdown={countdown} />
        )}
      </div>
      {message && <Toast message={message.text} isSuccess={message.type === "success"} />}
    </div>
  )
}

export default ChangePassword
