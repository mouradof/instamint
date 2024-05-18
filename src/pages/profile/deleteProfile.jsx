import React, { useState } from "react"
import useAppContext from "@/app/hooks/useContext.jsx"
import { useRouter } from "next/router"
import DeleteProfileForm from "@/app/components/profile/delete/DeleteProfileForm"
import DeleteProfileMessage from "@/app/components/profile/delete/DeleteProfileMessage"
import DeleteProfileCountdown from "@/app/components/profile/delete/DeleteProfileCountdown"

const DeleteProfile = () => {
  const {
    state: { session },
    action: { deleteUserProfile }
  } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  const handleDelete = async password => {
    setLoading(true)

    try {
      // eslint-disable-next-line no-unused-vars
      const [error, data] = await deleteUserProfile({ userId: session.id, password })

      if (error) {
        throw new Error(error)
      }

      setSuccess(true)
      setMessage("Account deleted successfully!")
      setTimeout(() => {
        router.push("/login")
      }, 5000)
    } catch (error) {
      setMessage(error.message || "Error deleting account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {!success ? (
          <DeleteProfileForm
            onDelete={handleDelete}
            loading={loading}
            message={message}
            success={success}
            router={router}
            session={session}
          />
        ) : (
          <>
            <DeleteProfileMessage countdown={countdown} />
            <DeleteProfileCountdown countdown={countdown} setCountdown={setCountdown} />
          </>
        )}
      </div>
    </div>
  )
}

export default DeleteProfile
