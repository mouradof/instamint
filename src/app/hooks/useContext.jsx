import config from "@/app/api/config.mjs"
import createAPIClient from "@/app/api/createAPIClient.mjs"
import { createContext, useContext, useEffect, useState } from "react"
import { decode } from "hono/jwt"
import createUserTeabagService from "@/app/services/teabags/teabagUserCreate.mjs"
import getUserTeabagsService from "@/app/services/teabags/teabagsUserGet.mjs"

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
    const jwt = localStorage.getItem("instamint")

    if (!jwt) {
      return
    }

    const { payload } = decode(jwt)

    setSession(payload)
    setJWT(jwt)
  }, [])

  const getUserTeabags = getUserTeabagsService({ apiClients })
  const createUserTeabag = createUserTeabagService({ apiClients })

  if (!isPublicPage && session === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white text-4xl font-bold">
        <span className="animate-bounce">Loading...</span>
      </div>
    )
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        action: {
          getUserTeabags,
          createUserTeabag
        },
        state: {
          session
        }
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
