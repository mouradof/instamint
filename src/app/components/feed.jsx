import React, { useState, useEffect } from "react"
import axios from "axios"
import Post from "./post"

const Feed = ({ type }) => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `http://localhost:4000/post/${type === "forYou" ? "for-you" : "subscribed"}/userId`
        const response = await axios.get(url)
        setPosts(response.data.data || [])
      } catch (err) {
        setError("Error retrieving posts: " + err.message)
      }
    }

    fetchPosts()
  }, [type])

  return (
    <div className="min-h-screen bg-white">
      {error && <p className="text-red-500">{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.postId}
            avatarUrl={post.avatarUrl}
            username={post.username}
            certified={post.certified}
            timeAgo={post.timeAgo}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            reposts={post.reposts}
            liked={post.liked}
            commented={post.commented}
            reposted={post.reposted}
          />
        ))
      ) : (
        <div className="text-center p-4">No posts to display.</div>
      )}
    </div>
  )
}

export default Feed
