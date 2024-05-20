import React from "react"
import Post from "@/app/components/business/Post.jsx"

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

const ProfileContent = ({ user, posts }) => {
  const postsCount = posts.length

  return (
    <div className="w-3/4 mt-4 px-4 flex flex-col items-start">
      <div className="flex w-full">
        <div className="flex flex-col items-start mr-8">
          <img src={user.profileImage} alt="Profile" className="h-24 w-24 rounded-full border-4 border-white" />
        </div>
        <div className="flex-grow flex justify-around">
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
      <div className="flex flex-col items-start mr-8">
        <div className="mt-2">
          <div className="text-xl font-bold">{user.username}</div>
          <div className="text-sm text-gray-600">{user.bio || "No bio provided."}</div>
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
            imageUrl={post.imageUrl}
            profileImage={user.profileImage}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContent
