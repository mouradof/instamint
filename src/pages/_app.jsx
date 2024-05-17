import Layout from "@/app/layout/layout.jsx"
import "../app/styles/globals.css"
import { AppContextProvider } from "@/app/hooks/useContext.jsx"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AppContextProvider isPublicPage={Component.isPublicPage}>
        <Component {...pageProps} />
      </AppContextProvider>
    </Layout>
  )
}

export default MyApp
