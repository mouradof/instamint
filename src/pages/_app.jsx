import Layout from "../app/layout/layout"
import "../app/styles/globals.css"
import Navigation from "../app/components/Navigation"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Navigation />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
