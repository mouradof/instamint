import prepareRoutesUsers from "./src/routes/auth-routes.js"
import prepareRouteLogin from "./src/routes/login-route.js"
import prepareRouteRegister from "./src/routes/register-routes.js"
import prepareRouteVerify from "./src/routes/verify-routes.js"

const prepareRoutes = (ctx) => {
    prepareRouteLogin(ctx)
    prepareRouteRegister(ctx)
    prepareRouteVerify(ctx)
    prepareRoutesUsers(ctx)
}

export default prepareRoutes