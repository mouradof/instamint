import React, { useState, useEffect } from "react"
import Post from "./Post.jsx"
import Toast from "../common/Toast.jsx"
import InfiniteScroll from "react-infinite-scroll-component"
import useAppContext from "@/app/hooks/useContext.jsx"

const Feed = ({ type }) => {
  const {
    state: { session },
    action: { getForyouPost, getSubscribedPost }
  } = useAppContext()

  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (type === "forYou") {
          const [apiError, apiData] = await getForyouPost({ userId: session.id, page })

          if (apiError) {
            setError(apiError)

            return
          }

          const sortedPosts = apiData.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

          if (page === 0) {
            setPosts(sortedPosts)
          } else {
            setPosts(prevPosts => [...prevPosts, ...sortedPosts])
          }

          setHasMore(apiData.hasMore)
        } else if (type === "subscribed") {
          const [apiError, apiData] = await getSubscribedPost({ userId: session.id, page })

          if (apiError) {
            setError(apiError)

            return
          }

          const sortedPosts = apiData.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

          if (page === 0) {
            setPosts(sortedPosts)
          } else {
            setPosts(prevPosts => [...prevPosts, ...sortedPosts])
          }

          setHasMore(apiData.hasMore)
        }
      } catch (err) {
        setError("Failed to fetch posts")
      }
    }

    fetchPosts()
  }, [type, page, getForyouPost, session.id, getSubscribedPost])

  useEffect(() => {
    setPage(0)
    setPosts([])
  }, [type])

  const fetchMorePosts = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="min-h-screen bg-white" style={{ marginTop: "100px" }}>
      {error && <Toast message={error} isSuccess={false} />}
      <InfiniteScroll dataLength={posts.length} next={fetchMorePosts} hasMore={hasMore}>
        {posts.map(post => {
          return (
            <Post
              key={post.postId}
              username={post.username}
              createdAt={post.createdAt}
              description={post.description}
              imageUrl={post.imageUrl}
              profileImage={post.profileImage}
              postId={post.postId}
              userId={post.userId}
              ownerId={post.ownerId}
            />
          )
        })}
      </InfiniteScroll>
      {posts.length === 0 && !error && <div className="text-center p-4">No posts to display.</div>}
    </div>
  )
}

export default Feed
