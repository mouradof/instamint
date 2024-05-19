import prepareRoutesForYou from "./src/routes/posts/ForYouRoute.js"
import prepareRoutesSubscribed from "./src/routes/posts/SubscribedRoute.js"
import prepareRoutesLike from "./src/routes/posts/LikeRoute.js"

const prepareRoutes = ctx => {
  prepareRoutesForYou(ctx)
  prepareRoutesSubscribed(ctx)
  prepareRoutesLike(ctx)
}

export default prepareRoutes
