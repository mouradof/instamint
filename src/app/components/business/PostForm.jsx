import React, { useState, useEffect } from "react"
import useAppContext from "@/app/hooks/useContext.jsx"
import Toast from "../common/Toast.jsx"
import { useRouter } from "next/router"
import { PlusIcon } from "@heroicons/react/24/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"

const PostForm = () => {
  const {
    state: { session },
    action: { createPost }
  } = useAppContext()
  const [validationMode, setValidationMode] = useState("None")

  const [description, setDescription] = useState("")
  const [media, setMedia] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [location, setLocation] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toast, setToast] = useState({ message: "", isSuccess: true })

  const router = useRouter()

  useEffect(() => {
    if (description.length > 0 && media && termsAccepted) {
      setValidationMode("Publish")
    } else if (description.length > 0 || media) {
      setValidationMode("Draft")
    } else {
      setValidationMode("None")
    }
  }, [description, media, termsAccepted])

  const handleDescriptionChange = e => {
    const filteredDescription = e.target.value.replace(/[#@]/g, "").slice(0, 300)
    setDescription(filteredDescription)
  }

  const handleMediaChange = e => {
    setMedia(e.target.files[0])
  }

  const handleTermsChange = e => {
    setTermsAccepted(e.target.checked)
  }

  const handleLocationChange = e => {
    const newValue = e.target.value
      .replace(/[#@]/g, "")
      .replace(
        /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        ""
      )
      .slice(0, 50)
    setLocation(newValue)
  }

  const handleHashtagsChange = e => {
    const input = e.target.value.replace(/[@]/g, "")
    const cleanInput = input.replace(/[^a-zA-Z\s#]/g, "")
    const words = cleanInput.split(/\s+/)

    if (words.length <= 5) {
      const hashtags = words
        .map(word => {
          return word.startsWith("#") ? word : `#${word}`
        })
        .join(" ")

      if (hashtags.length <= 50) {
        setHashtags(hashtags)
      }
    }
  }

  const showToast = (message, isSuccess) => {
    setToast({ message, isSuccess })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()

    if (media) {
      formData.append("mediaData", media)
    }

    formData.append("description", description)
    formData.append("termsAccepted", termsAccepted)
    formData.append("location", location)
    formData.append("hashtags", hashtags)
    const isDraft = validationMode !== "Publish"
    formData.append("isDraft", isDraft ? "true" : "false")

    try {
      const response = await createPost({
        userId: session.id,
        formData
      })

      const message = isDraft
        ? "Draft saved successfully! Please wait a few moments..."
        : "Post published successfully! Please wait a few moments..."
      showToast(message, true)
      setTimeout(() => {
        if (response.success) {
          setIsSubmitted(true)
        } else {
          showToast(response.message, false)
        }

        setTimeout(router.reload, 1500)
      }, 1500)
    } catch (err) {
      showToast("Failed to create post", false)
    }
  }

  const colorButton = () => {
    if (validationMode === "Publish") {
      return "bg-green-500 hover:bg-green-700"
    } else if (validationMode === "Draft") {
      return "bg-blue-500 hover:bg-blue-700"
    } else {
      return "bg-gray-500 opacity-50 cursor-not-allowed"
    }
  }

  return (
    <>
      {toast.message && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <textarea
              placeholder="Enter your post description"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={300}
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept=".png, .webp, .ogg, .flac, .h.264"
              onChange={handleMediaChange}
              className="border p-2 rounded"
            />
            <div className="flex items-center">
              <input type="checkbox" checked={termsAccepted} onChange={handleTermsChange} required />
              <span className="ml-2">I accept the terms of use</span>
            </div>
            <input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={handleLocationChange}
              maxLength={100}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Enter your hashtags"
              value={hashtags}
              onChange={handleHashtagsChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${colorButton()}`}
              disabled={validationMode === "None"}
            >
              {validationMode === "Publish" ? (
                <div className="flex justify-center items-center">
                  <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Publish
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <BookmarkIconSolid className="h-5 w-5 mr-2" aria-hidden="true" />
                  Draft
                </div>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 text-green-500">
          <span className="h-10 w-10 text-green-500 mx-auto">✔</span>
          Post created successfully!
        </div>
      )}
    </>
  )
}

export default PostForm
