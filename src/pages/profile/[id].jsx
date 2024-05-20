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
    if (!session) {
      router.push("/login")

      return
    }

    const fetchUserData = async () => {
      try {
        const userId = router.query.id

        if (!userId) {
          return
        }

        const [profileError, profileData] = await getUserProfile({ userId })

        if (profileError) {
          throw new Error(profileError)
        }

        setUser(profileData)

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
  }, [session, router.query.id, getUserProfile, getUserPosts, router])

  if (!session) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full">
      {user ? (
        <>
          <ProfileHeader user={user} />
          <ProfileContent user={user} posts={userPosts} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProfilePage
