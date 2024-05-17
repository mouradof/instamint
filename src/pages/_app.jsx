import Layout from "@/app/layout/layout.jsx"
import "@/app/styles/globals.css"
import { AppContextProvider } from "@/app/hooks/useContext.jsx"

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider isPublicPage={Component.isPublicPage}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}

export default MyApp
