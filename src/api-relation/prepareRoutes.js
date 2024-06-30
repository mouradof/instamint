import prepareRoutesTeabags from "./src/routes/prepareRoutesTeabags.js"
import prepareRoutesCreateTeabag from "./src/routes/prepareRoutesCreateTeabag.js"
import prepareRoutesTeabagById from "./src/routes/prepareRoutesTeabagById.js"
import prepareRoutesTeabagPosts from "./src/routes/prepareRoutesTeabagPosts.js"

const prepareRoutes = ctx => {
  prepareRoutesTeabags(ctx)
  prepareRoutesCreateTeabag(ctx)
  prepareRoutesTeabagById(ctx)
  prepareRoutesTeabagPosts(ctx)
}

export default prepareRoutes
