import config from "@/app/api/config.mjs"
import createAPIClient from "@/app/api/createAPIClient.mjs"
import { createContext, useContext, useEffect, useState } from "react"
import { decode } from "hono/jwt"
import createUserTeabagService from "@/app/services/teabags/teabagUserCreate.mjs"
import getUserTeabagsService from "@/app/services/teabags/teabagsUserGet.mjs"
import getUserProfileService from "@/app/services/profile/getUserProfile.mjs"
import updateUserProfileService from "@/app/services/profile/updateUserProfile.mjs"
import changeUserPasswordService from "@/app/services/profile/changeUserPassword.mjs"
import deleteUserProfileService from "@/app/services/profile/deleteUserProfile.mjs"

const AppContext = createContext()

export const AppContextProvider = props => {
  const { isPublicPage, ...otherProps } = props
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)

  const apiClients = {}
  for (const apiKey in config) {
    apiClients[apiKey] = createAPIClient({ jwt, apiKey })
  }

  useEffect(() => {
    const storedJwt = localStorage.getItem("instamint") || localStorage.getItem("token")

    if (!storedJwt) {
      return
    }

    try {
      const { payload } = decode(storedJwt)

      if (payload && payload.id) {
        setSession(payload)
        setJWT(storedJwt)
      } else {
        localStorage.removeItem("instamint")
        localStorage.removeItem("token")
      }
    } catch (error) {
      localStorage.removeItem("instamint")
      localStorage.removeItem("token")
    }
  }, [])

  const getUserTeabags = getUserTeabagsService({ apiClients })
  const createUserTeabag = createUserTeabagService({ apiClients })
  const getUserProfile = getUserProfileService({ apiClients })
  const updateUserProfile = updateUserProfileService({ apiClients })
  const changePassword = changeUserPasswordService({ apiClients })
  const deleteUserProfile = deleteUserProfileService({ apiClients })

  const appContextValue = {
    state: { session },
    action: {
      getUserTeabags,
      createUserTeabag,
      getUserProfile,
      updateUserProfile,
      changePassword,
      deleteUserProfile
    }
  }

  if (!isPublicPage && session === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return <AppContext.Provider value={appContextValue} {...otherProps} />
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
