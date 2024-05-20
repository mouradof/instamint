import React from "react"
import Footer from "../components/common/Footer"

const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
