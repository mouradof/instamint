import React, { useState, useEffect } from "react"
import axios from "axios"
import Post from "./Post"
import Toast from "../common/Toast"
import InfiniteScroll from "react-infinite-scroll-component"

const Feed = ({ type, userId }) => {
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const param = type === "subscribed" ? "subscribed" : "for-you"
        const url = `http://localhost:4002/post/${param}/1?page=${page}`
        const response = await axios.get(url)

        if (response.data.success) {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data])
          setHasMore(response.data.hasMore)
        } else {
          setError(response.data.message)
        }
      } catch (error) {
        setError("Failed to fetch posts")
      }
    }

    fetchPosts()
  }, [type, userId, page])

  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {error && <Toast message={error} isSuccess={false} />}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
      >
        {posts.map((post) => (
          <Post
            key={post.postId}
            username={post.username}
            createdAt={post.createdAt}
            description={post.description}
            imageUrl={post.imageUrl}
            avatarUrl={post.avatarUrl}
            postId={post.postId}
          />
        ))}
      </InfiniteScroll>
      {posts.length === 0 && !error && (
        <div className="text-center p-4">No posts to display.</div>
      )}
    </div>
  )
}

export default Feed
