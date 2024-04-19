import { useState, useCallback } from "react"

const usePostInteractions = (
  initialLikes,
  initialReposts,
  isInitiallyLiked,
  isInitiallyReposted,
) => {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [isReposted, setIsReposted] = useState(isInitiallyReposted)
  const [repostCount, setRepostCount] = useState(initialReposts)

  const toggleLike = useCallback(() => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }, [isLiked])

  const toggleRepost = useCallback(() => {
    setIsReposted(!isReposted)
    setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1))
  }, [isReposted])

  return {
    isLiked,
    likeCount,
    isReposted,
    repostCount,
    toggleLike,
    toggleRepost,
  }
}

export default usePostInteractions
