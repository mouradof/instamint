import React from "react"
import Post from "./post"
import { useEffect } from "react"

const forYouPosts = [
  {
    postId: 1,
    avatarUrl: "/empty.jpg",
    username: "Yeet Cup",
    timeAgo: "1h",
    content:
      "The Yeetards will raid the warmhole @wormhole discord soon, 1pm EST We just can't stop Yeeting",
    imageUrl: "/unknown.png",
    likes: 120,
    comments: 30,
    reposts: 10,
    liked: false,
    commented: false,
    reposted: false,
  },
  {
    postId: 2,
    avatarUrl: "/empty.jpg",
    username: "NyamCatCrypto",
    certified: true,
    timeAgo: "8h",
    content: "My first NFT drop is live ‼",
    imageUrl: null,
    likes: 340,
    comments: 50,
    reposts: 20,
    liked: false,
    commented: false,
    reposted: false,
  },
  {
    postId: 5,
    avatarUrl: "/empty.jpg",
    username: "CryptoKitties",
    timeAgo: "1d",
    content: null,
    imageUrl: "/unknown.png",
    likes: 500,
    comments: 100,
    reposts: 30,
    liked: false,
    commented: false,
    reposted: false,
  },
]

const subscribedPosts = [
  {
    postId: 3,
    avatarUrl: "/empty.jpg",
    username: "Robotic Rabbit Syndicate",
    certified: true,
    timeAgo: "10h",
    content: "Transmission:: 1/1 Legendary Origin | Royal Robbin Rabbit",
    imageUrl: "/unknown.png",
    likes: 220,
    comments: 40,
    reposts: 5,
    liked: false,
    commented: false,
    reposted: false,
  },
  {
    postId: 4,
    avatarUrl: "/empty.jpg",
    username: "Smoke Heads LEGENDS",
    timeAgo: "8h",
    content:
      "GM Legends 💨💨💚 SH Legend Jiren 'Strength is everything. All is possible with power and power alone'",
    imageUrl: "/unknown.png",
    likes: 180,
    comments: 15,
    reposts: 8,
    liked: false,
    commented: false,
    reposted: false,
  },
]

const Feed = ({ type }) => {
  const posts = type === "forYou" ? forYouPosts : subscribedPosts

  return (
    <div className="min-h-screen bg-white">
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
        <div className="text-center p-4">Aucun post à afficher.</div>
      )}
    </div>
  )
}

export default Feed
