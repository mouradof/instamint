import { useState, useCallback, useEffect } from "react"
import useAppContext from "@/app/hooks/useContext.jsx"

const usePostInteractions = postId => {
  const {
    state: { session },
    action: { getLikedPost, getLikesPost, deleteLikePost, postLikePost }
  } = useAppContext()

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(null)
  const [toast, setToast] = useState({ message: "", isSuccess: true })
  const [error, setError] = useState(null)

  const showError = message => {
    setToast({ message, isSuccess: false })
  }

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const [likedError, likedResponse] = await getLikedPost({ postId, userId: session.id })
        const [likesError, likesResponse] = await getLikesPost({ postId, userId: session.id })

        if (likedError || likesError) {
          setError(likedError || likesError)
          showError(likedError || likesError)

          return
        }

        setIsLiked(likedResponse.isLiked)
        setLikeCount(likesResponse.likeCount > 0 ? likesResponse.likeCount : null)
      } catch (err) {
        setError("Failed to fetch like data")
        showError("Failed to fetch like data")
      }
    }

    fetchLikeStatus()
  }, [postId, getLikedPost, getLikesPost, session.id])

  const toggleLike = useCallback(async () => {
    try {
      if (isLiked) {
        const { error } = await deleteLikePost({ postId, userId: session.id })

        if (error) {
          setError(error)
          showError(error)

          return
        }

        setIsLiked(false)
        setLikeCount(prev => (prev > 1 ? parseInt(prev) - 1 : null))
      } else {
        const { error } = await postLikePost({ postId, userId: session.id })

        if (error) {
          setError(error)
          showError(error)

          return
        }

        setIsLiked(true)
        setLikeCount(prev => (prev != null ? parseInt(prev) + 1 : 1))
      }
    } catch (err) {
      setError("Failed to update like status")
      showError("Failed to update like status")
    }
  }, [postId, isLiked, deleteLikePost, postLikePost, session.id])

  return {
    isLiked,
    likeCount,
    toggleLike,
    error,
    toast
  }
}

export default usePostInteractions
