import React, { useState, useEffect } from "react"
import Post from "./Post.jsx"
import Toast from "../common/Toast.jsx"
import InfiniteScroll from "react-infinite-scroll-component"
import useAppContext from "@/app/hooks/useContext.jsx"

const Feed = ({ type, teabagId }) => {
  const {
    state: { session },
    action: { getForyouPost, getSubscribedPost, getTeabagPosts }
  } = useAppContext()

  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let apiError, apiData

        if (type === "forYou") {
          ;[apiError, apiData] = await getForyouPost({ userId: session.id, page })
        } else if (type === "subscribed") {
          ;[apiError, apiData] = await getSubscribedPost({ userId: session.id, page })
        } else if (type === "teabag" && teabagId) {
          ;[apiError, apiData] = await getTeabagPosts({ teabagId, page })
        }

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
      } catch (err) {
        setError("Failed to fetch posts")
      }
    }

    fetchPosts()
  }, [type, page, getForyouPost, session.id, getSubscribedPost, getTeabagPosts, teabagId])

  useEffect(() => {
    setPage(0)
    setPosts([])
  }, [type, teabagId])

  const fetchMorePosts = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="min-h-screen bg-white" style={{ marginTop: "100px" }}>
      {error && <Toast message={error} isSuccess={false} />}
      <InfiniteScroll dataLength={posts.length} next={fetchMorePosts} hasMore={hasMore}>
        {posts.map(post => (
          <Post
            key={post.postId}
            username={post.username}
            createdAt={post.createdAt}
            description={post.description}
            mediaData={post.mediaData}
            location={post.location}
            hashtags={post.hashtags}
            profileImage={post.profileImage}
            postId={post.postId}
            userId={post.userId}
            ownerId={post.ownerId}
          />
        ))}
      </InfiniteScroll>
      {posts.length === 0 && !error && <div className="text-center p-4">No posts to display.</div>}
    </div>
  )
}

export default Feed
