import prepareRoutesForYou from "./src/routes/posts/ForYouRoute.js"
import prepareRoutesSubscribed from "./src/routes/posts/SubscribedRoute.js"
import prepareRoutesLike from "./src/routes/posts/LikeRoute.js"
import prepareRoutesReport from "./src/routes/posts/ReportRoute.js"
import prepareRoutesDeletePost from "./src/routes/posts/DeletePostRoute.js"

const prepareRoutes = ctx => {
  prepareRoutesForYou(ctx)
  prepareRoutesSubscribed(ctx)
  prepareRoutesLike(ctx)
  prepareRoutesReport(ctx)
  prepareRoutesDeletePost(ctx)
}

export default prepareRoutes
