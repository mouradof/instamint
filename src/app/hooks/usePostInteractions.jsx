import { useState, useCallback, useEffect } from "react"
import axios from "axios"

const usePostInteractions = (postId, initialLikes, isInitiallyLiked) => {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked)
  const [likeCount, setLikeCount] = useState(
    initialLikes > 0 ? initialLikes : null,
  )

  const [toast, setToast] = useState({ message: "", isSuccess: true })

  const showError = (error) => {
    setToast({ message: error, isSuccess: false })
  }

  const fetchLikes = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4002/post/likes/${postId}`,
      )

      if (response.data.success) {
        setLikeCount(
          response.data.likeCount > 0 ? response.data.likeCount : null,
        )
      }
    } catch (error) {
      showError("Failed to fetch likes")
    }
  }, [postId])

  useEffect(() => {
    const checkLikeStatus = async () => {
      const response = await axios.get(
        `http://localhost:4002/post/liked/${postId}`,
      )
      setIsLiked(response.data.isLiked)
    }

    checkLikeStatus()
    fetchLikes()
  }, [postId, fetchLikes])

  const toggleLike = useCallback(async () => {
    const url = `http://localhost:4002/post/like/${postId}`

    if (isLiked) {
      try {
        const response = await axios.delete(url)

        if (response.data.success) {
          setIsLiked(false)
          setLikeCount((prev) => (prev > 1 ? parseInt(prev) - 1 : null))
        }
      } catch (error) {
        showError("Failed to remove like")
      }
    } else {
      try {
        const response = await axios.post(url)

        if (response.data.success) {
          setIsLiked(true)
          setLikeCount((prev) => (prev != null ? parseInt(prev) + 1 : 1))
        }
      } catch (error) {
        showError("Failed to add like")
      }
    }
  }, [isLiked, postId])

  return {
    isLiked,
    likeCount,
    toggleLike,
    fetchLikes,
    toast,
  }
}

export default usePostInteractions
