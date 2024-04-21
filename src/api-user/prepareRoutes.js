import prepareRoutesUsers from "./src/routes/auth-routes.js"

const prepareRoutes = (ctx) => {
    prepareRoutesUsers(ctx)
}

export default prepareRoutes