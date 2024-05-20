import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import ProfileHeader from "@/app/components/profile/ProfileHeader.jsx"
import ProfileContent from "@/app/components/profile/ProfileContent.jsx"
import useAppContext from "@/app/hooks/useContext.jsx"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const router = useRouter()
  const {
    state: { session },
    action: { getUserProfile, getUserPosts }
  } = useAppContext()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = router.query.id
        const [error, data] = await getUserProfile({ userId })

        if (error) {
          throw new Error(error)
        }

        setUser(data)

        const [postsError, postsData] = await getUserPosts({ userId })

        if (postsError) {
          throw new Error(postsError)
        }

        setUserPosts(postsData)
      } catch (err) {
        router.push("/login")
      }
    }

    fetchUserData()
  }, [router.query.id, getUserProfile, getUserPosts, router])

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  const isOwnProfile = session && session.user && session.user.id === user.id

  return (
    <div className="flex flex-col items-center w-full">
      <ProfileHeader user={user} readOnly={!isOwnProfile} />
      <ProfileContent user={user} posts={userPosts} readOnly={!isOwnProfile} />
    </div>
  )
}

export default ProfilePage
