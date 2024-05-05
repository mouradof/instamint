import { forYouPostsRoutes } from "./posts/ForYouRoute.js"
import { subscribedPostsRoutes } from "./posts/SubscribedRoute.js"
import { likeRoutes } from "./posts/LikeRoute.js"

export default function prepareRoutesPosts(app, db) {
  forYouPostsRoutes(app, db)
  subscribedPostsRoutes(app, db)
  likeRoutes(app, db)
}
