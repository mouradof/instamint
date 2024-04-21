import Layout from "../app/layout/layout"
import "../app/styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
