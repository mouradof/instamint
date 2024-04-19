import React from "react"
import Image from "next/image"
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline"
import {
  HeartIcon as HeartIconSolid,
  ArrowPathRoundedSquareIcon as ArrowPathRoundedSquareIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
} from "@heroicons/react/24/solid"
import usePostInteractions from "../hooks/usePostInteractions"

const Post = ({
  avatarUrl,
  username,
  timeAgo,
  certified,
  content,
  imageUrl,
  likes,
  reposts,
  liked,
  reposted,
}) => {
  const {
    isLiked,
    likeCount,
    isReposted,
    repostCount,
    toggleLike,
    toggleRepost,
  } = usePostInteractions(likes, reposts, liked, reposted)

  return (
    <div className="border-b border-gray-200 px-4 py-4 bg-white">
      <div className="flex space-x-3">
        <div className="min-w-0 flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={username}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h4 className="font-bold text-black text-sm">{username}</h4>
              {certified && (
                <CheckBadgeIconSolid className="h-5 w-5 text-green-500 ml-1" />
              )}
              <span className="text-gray-500 text-xs ml-2">{timeAgo}</span>
            </div>
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
          </div>
          {content && <p className="text-sm text-gray-800">{content}</p>}
          {imageUrl && (
            <div className="relative w-full">
              <Image
                src={imageUrl}
                alt="Post image"
                layout="responsive"
                width={399}
                height={399}
                className="rounded-lg mt-2"
              />
            </div>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <button
                onClick={toggleLike}
                className="flex items-center space-x-1 text-gray-500"
              >
                {isLiked ? (
                  <HeartIconSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                <span
                  className={`ml-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                >
                  {likeCount}
                </span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={toggleRepost}
                className="flex items-center space-x-1 text-gray-500"
              >
                {isReposted ? (
                  <ArrowPathRoundedSquareIconSolid className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                )}
                <span
                  className={`ml-1 ${isReposted ? "text-green-500" : "text-gray-500"}`}
                >
                  {repostCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
