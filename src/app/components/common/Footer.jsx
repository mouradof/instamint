import React from "react"
import { HomeIcon, MagnifyingGlassIcon, UserGroupIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserCircleIcon as UserCircleIconSolid
} from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import useAppContext from "../../hooks/useContext"

const Footer = ({ toggleSearch }) => {
  const router = useRouter()
  const { state } = useAppContext()
  const { session } = state

  const navigate = page => {
    router.push(`/${page}`)
  }

  const navigateToProfile = () => {
    if (session?.id) {
      router.push(`/profile/${session.id}`)
    } else {
      router.push("/login")
    }
  }

  return (
    <footer className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-evenly items-center max-w-2xl mx-auto p-5">
        <button onClick={() => navigate("home")}>
          {router.pathname === "/home" ? (
            <HomeIconSolid className="h-7 w-7 text-green-500" />
          ) : (
            <HomeIcon className="h-7 w-7 text-gray-500" />
          )}
        </button>
        <button onClick={toggleSearch}>
          {router.pathname === "/search" ? (
            <MagnifyingGlassIconSolid className="h-7 w-7 text-green-500" />
          ) : (
            <MagnifyingGlassIcon className="h-7 w-7 text-gray-500" />
          )}
        </button>
        <button onClick={() => navigate("groups")}>
          {router.pathname === "/groups" ? (
            <UserGroupIconSolid className="h-7 w-7 text-green-500" />
          ) : (
            <UserGroupIcon className="h-7 w-7 text-gray-500" />
          )}
        </button>
        <button onClick={navigateToProfile}>
          {router.pathname.startsWith("/profile") ? (
            <UserCircleIconSolid className="h-7 w-7 text-green-500" />
          ) : (
            <UserCircleIcon className="h-7 w-7 text-gray-500" />
          )}
        </button>
      </div>
    </footer>
  )
}

export default Footer
