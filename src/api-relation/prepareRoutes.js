import prepareRoutesTeabags from "./src/routes/prepareRoutesTeabags.js"
import prepareRoutesCreateTeabag from "./src/routes/prepareRoutesCreateTeabag.js"
import prepareRoutesFollow from "./src/routes/prepareRoutesFollow.js"

const prepareRoutes = ctx => {
  prepareRoutesTeabags(ctx)
  prepareRoutesCreateTeabag(ctx)
  prepareRoutesFollow(ctx)
}

export default prepareRoutes
