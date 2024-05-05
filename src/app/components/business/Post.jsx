import React from "react"
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline"
import {} from "@heroicons/react/24/solid"
import usePostInteractions from "../../hooks/UsePostInteractions"
import { formatDistanceToNow } from "date-fns"
import Toast from "../common/Toast"

const Post = ({
  postId,
  avatarUrl,
  username,
  createdAt,
  description,
  imageUrl,
  likes,
  liked,
}) => {
  const { isLiked, likeCount, toggleLike, toast } = usePostInteractions(
    postId,
    likes,
    liked,
  )

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  })

  const mintIcon = "/images/mint.png"
  const mintIconSolid = "/images/mintSolid.png"

  return (
    <div className="border-b border-gray-200 px-4 py-4 bg-white">
      <div className="flex space-x-3">
        <div className="min-w-0 flex-shrink-0">
          <img
            src={avatarUrl}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h4 className="font-bold text-black text-sm">{username}</h4>
              <span className="text-gray-500 text-xs ml-2">
                {formattedTime}
              </span>
            </div>
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
          </div>
          {description && (
            <p className="text-sm text-gray-800">{description}</p>
          )}
          {imageUrl && (
            <div className="relative w-full mt-2">
              <img
                src={imageUrl}
                alt="Post image"
                width={399}
                height={399}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <button
                onClick={toggleLike}
                className="flex items-center space-x-1 text-gray-500"
              >
                <img
                  src={isLiked ? mintIconSolid : mintIcon}
                  alt="mint Icon"
                  className="h-4 w-4"
                />
                <span
                  className={`ml-1 ${isLiked ? "text-green-500" : "text-gray-500"}`}
                >
                  {likeCount}
                </span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {toast.message && (
        <Toast message={toast.message} isSuccess={toast.isSuccess} />
      )}
    </div>
  )
}

export default Post
