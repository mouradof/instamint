import React, { useState } from "react"
import Modal from "../common/Modal.jsx"
import Toast from "../common/Toast.jsx"
import useAppContext from "@/app/hooks/useContext.jsx"
import { CheckIcon } from "@heroicons/react/24/outline"

const REPORT_REASONS = [
  "Hate",
  "Inappropriate behavior and harassment",
  "Violent speech",
  "Sensitive or inconvenient media",
  "Identity theft",
  "Violent and hateful entities",
  "Spam",
  "I just don't like that"
]

const ReportModal = ({ isOpen, onClose, postId }) => {
  const {
    state: { session },
    action: { postReportPost }
  } = useAppContext()

  const [selectedOption, setSelectedOption] = useState("")
  const [error, setError] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toast, setToast] = useState({ message: "", isSuccess: true })

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const [error, response] = await postReportPost({
        postId,
        userId: session.id,
        reason: selectedOption
      })

      if (error) {
        setError(response.message)
        showToast(response.message, false)
      } else {
        setIsSubmitted(true)
        showToast("Report submitted successfully!", true)
      }
    } catch (err) {
      const errorMessage = "Failed to submit report"
      setError(errorMessage)
      showToast(errorMessage, false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="What kind of problems do you report?">
      {toast.message && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {REPORT_REASONS.map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name="report"
                  value={option}
                  onChange={e => setSelectedOption(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                selectedOption ? "bg-green-500 hover:bg-green-700" : "bg-green-300 cursor-not-allowed opacity-50"
              }`}
              disabled={!selectedOption}
            >
              Send the report
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 text-green-500">
          <CheckIcon className="h-10 w-10 text-green-500 mx-auto" />
          Thank you for helping us improve Instamint for the benefit of all.
        </div>
      )}
    </Modal>
  )
}

export default ReportModal
