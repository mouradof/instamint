import React, { useState } from "react"
import Footer from "../components/common/Footer"
import Search from "../components/common/SearchBar"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const { pathname } = router

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const noFooterPaths = ["/", "/login", "/register"]

  return (
    <div>
      <main>{children}</main>
      {!noFooterPaths.includes(pathname) && <Footer toggleSearch={toggleSearch} />}
      {isSearchOpen && !noFooterPaths.includes(pathname) && <Search toggleSearch={toggleSearch} />}
    </div>
  )
}

export default Layout
