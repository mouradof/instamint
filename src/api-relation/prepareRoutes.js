import prepareRoutesTeabags from "./src/routes/prepareRoutesTeabags.js"
import prepareRoutesCreateTeabag from "./src/routes/prepareRoutesCreateTeabag.js"

const prepareRoutes = ctx => {
  prepareRoutesTeabags(ctx)
  prepareRoutesCreateTeabag(ctx)
}

export default prepareRoutes
