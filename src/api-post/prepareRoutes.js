import prepareRoutesForYou from "./src/routes/ForYouRoute.js"
import prepareRoutesSubscribed from "./src/routes/SubscribedRoute.js"
import prepareRoutesLike from "./src/routes/LikeRoute.js"
import prepareRoutesReport from "./src/routes/ReportRoute.js"
import prepareRoutesDeletePost from "./src/routes/DeletePostRoute.js"
import prepareRoutesCreatePost from "./src/routes/CreatePostRoute.js"

const prepareRoutes = ctx => {
  prepareRoutesForYou(ctx)
  prepareRoutesSubscribed(ctx)
  prepareRoutesLike(ctx)
  prepareRoutesReport(ctx)
  prepareRoutesDeletePost(ctx)
  prepareRoutesCreatePost(ctx)
}

export default prepareRoutes
