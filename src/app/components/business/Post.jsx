import React, { useState, useEffect } from "react"
import { ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import usePostInteractions from "../../hooks/usePostInteractions.jsx"
import { formatDistanceToNow } from "date-fns"
import Toast from "../common/Toast.jsx"
import PostOptionsPopup from "../business/OptionsPopupPost.jsx"
import ReportModal from "./ReportModalPost.jsx"
import DeleteModalPost from "./DeleteModalPost.jsx"
import useAppContext from "@/app/hooks/useContext.jsx"
import CommentList from "../comments/CommentList.jsx"
import CommentForm from "../comments/CommentForm.jsx"

const Post = ({ postId, profileImage, username, ownerId, createdAt, description, imageUrl }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const { isLiked, likeCount, toggleLike, error } = usePostInteractions(postId)
  const [comments, setComments] = useState([])
  const [commentSuccess, setCommentSuccess] = useState("")

  const {
    state: { session }
  } = useAppContext()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4002/post/${postId}/comments`)
        const data = await response.json()

        if (Array.isArray(data)) {
          setComments(data)
        } else {
          setComments([])
        }
      } catch (error) {
        setComments([])
      }
    }

    fetchComments()
  }, [postId])

  const handleReportClick = shouldShow => {
    setShowReportModal(shouldShow)
    setShowOptions(false)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
    setShowOptions(false)
  }

  const handleCommentAdded = newComment => {
    setComments([newComment, ...comments])
    setCommentSuccess("Comment added successfully!")
    setTimeout(() => {
      setCommentSuccess("")
    }, 3000)
  }

  const isAuthor = session.id === ownerId

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true
  })

  const mintIcon = "/images/mint.png"
  const mintIconSolid = "/images/mintSolid.png"

  return (
    <div className="border-b border-gray-200 px-4 py-4 bg-white">
      <div className="flex space-x-3">
        <div className="min-w-0 flex-shrink-0">
          <img src={profileImage} alt="Profile image" width={40} height={40} className="rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h4 className="font-bold text-black text-sm">{username}</h4>
              <span className="text-gray-500 text-xs ml-2">{formattedTime}</span>
            </div>
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" onClick={() => setShowOptions(!showOptions)} />
            {showOptions && (
              <PostOptionsPopup
                onReportClick={handleReportClick}
                onDeleteClick={handleDeleteClick}
                isAuthor={isAuthor}
              />
            )}
          </div>
          <ReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} postId={postId} />
          <DeleteModalPost isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} postId={postId} />
          {description && <p className="text-sm text-gray-800">{description}</p>}
          {imageUrl && (
            <div className="relative w-full mt-2">
              <img src={imageUrl} alt="Post image" width={399} height={399} className="rounded-lg" />
            </div>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <button onClick={toggleLike} className="flex items-center space-x-1 text-gray-500">
                <img
                  src={isLiked ? mintIconSolid : mintIcon}
                  alt="mint Icon"
                  className="h-4 w-4"
                  width={40}
                  height={40}
                />
                <span className={`ml-1 ${isLiked ? "text-green-500" : "text-gray-500"}`}>{likeCount}</span>
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-gray-500"
              >
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                <span className="ml-1">{comments.length}</span>
              </button>
            </div>
          </div>
          {showComments && (
            <>
              <CommentList comments={comments} />
              <CommentForm postId={postId} userId={session.id} onCommentAdded={handleCommentAdded} />
            </>
          )}
        </div>
      </div>
      {error && <Toast message={error} isSuccess={false} />}
      {commentSuccess && <Toast message={commentSuccess} isSuccess={true} />}
    </div>
  )
}

export default Post
