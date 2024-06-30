import React, { useState } from "react"
import Post from "@/app/components/business/Post.jsx"
import { useRouter } from "next/router"
import useAppContext from "@/app/context/AppContext"

const formatNumber = num => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + " B"
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + " K"
  }

  return num.toString()
}

const ProfileContent = ({ user, posts, readOnly }) => {
  const postsCount = posts.length
  const router = useRouter()
  const { action } = useAppContext()
  const [isFollowing, setIsFollowing] = useState(false) // État pour gérer le suivi

  const handleFollow = async () => {
    await action.followUser({ userId: user.id })
    setIsFollowing(true)
  }

  const handleUnfollow = async () => {
    await action.unfollowUser({ userId: user.id })
    setIsFollowing(false)
  }

  return (
    <div className="mt-4 px-4 flex flex-col items-start" style={{ padding: "10px" }}>
      <div className="flex w-full">
        <div className="flex flex-col items-start mr-8">
          <img src={user.profileImage} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white" />
        </div>
        <div className="flex-grow flex justify-around mt-6">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg" title={postsCount}>
              {formatNumber(postsCount)}
            </span>
            <span className="text-sm text-gray-600">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg" title={user.following}>
              {formatNumber(user.following)}
            </span>
            <span className="text-sm text-gray-600">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg" title={user.followers}>
              {formatNumber(user.followers)}
            </span>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="mt-2">
          <div className="text-xl font-bold">{user.username}</div>
          <div className="text-sm text-gray-600">{user.bio || "No bio provided."}</div>
        </div>
        <div className="mt-4 flex justify-center w-full space-x-2">
          {!readOnly ? (
            <>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                onClick={() => router.push("/profile/editProfile")}
              >
                Edit Profile
              </button>
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded">Share Profile</button>
            </>
          ) : (
            <>
              {isFollowing ? (
                <button
                  className="text-white py-2 px-4 rounded"
                  style={{ backgroundColor: "#16502d" }}
                  onClick={handleUnfollow}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="text-white py-2 px-4 rounded"
                  style={{ backgroundColor: "#16502d" }}
                  onClick={handleFollow}
                >
                  Follow
                </button>
              )}
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded">Message</button>
            </>
          )}
        </div>
      </div>
      <hr className="w-full mt-4" />
      <div className="mt-4 w-full">
        {posts.map(post => (
          <Post
            key={post.id}
            postId={post.id}
            username={user.username}
            createdAt={post.createdAt}
            description={post.description}
            mediaData={post.mediaData}
            profileImage={user.profileImage}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContent
