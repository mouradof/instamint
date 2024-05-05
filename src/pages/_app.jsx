import React from "react"
import "../app/globals.css"

const Page = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default Page
