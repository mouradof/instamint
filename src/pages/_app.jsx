import React from "react"
import { NavigationProvider } from "../app/context/navigationContext"
import "../app/globals.css"

const Page = ({ Component, pageProps }) => {
  return (
    <NavigationProvider>
      <Component {...pageProps} />
    </NavigationProvider>
  )
}

export default Page
