import axios from "axios"
import { useCallback, useState } from "react"

const usePostInteractions = (
  postId,
  initialLikes,
  initialReposts,
  isInitiallyLiked,
  isInitiallyReposted,
) => {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [isReposted, setIsReposted] = useState(isInitiallyReposted)
  const [repostCount, setRepostCount] = useState(initialReposts)

  const toggleLike = useCallback(async () => {
    try {
      const method = isLiked ? "DELETE" : "POST"
      const response = await axios[method](
        `http://localhost:4000/post/like/${postId}`,
      )

      if (response.status === 200) {
        setIsLiked(!isLiked)
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
      }
    } catch (error) {
      /* empty */
    }
  }, [isLiked, postId])

  const toggleRepost = useCallback(async () => {
    try {
      const method = isReposted ? "DELETE" : "POST"
      const response = await axios[method](
        `http://localhost:4000/post/repost/${postId}`,
      )

      if (response.status === 200) {
        setIsReposted(!isReposted)
        setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1))
      }
    } catch (error) {
      /* empty */
    }
  }, [isReposted, postId])

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
