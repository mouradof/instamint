import { Hono } from "hono"
import fetchForYou from "./posts/fetchForYou.js"
import fetchSubscribed from "./posts/fetchSubscribed.js"
import toggleLike from "./posts/toggleLike.js"
import toggleRepost from "./posts/toggleRepost.js"

const app = new Hono()

app.route("/post/for-you/:id", fetchForYou)
app.route("/post/subscribed/:id", fetchSubscribed)
app.route("/post/like/:id", toggleLike)
app.route("/post/repost/:id", toggleRepost)

export default app
