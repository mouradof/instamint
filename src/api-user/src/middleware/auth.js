const jwt = require("jsonwebtoken")

async function authMiddleware(ctx, next) {
  const authHeader = ctx.req.headers.get("authorization")

  if (!authHeader) {
    ctx.status(401)

    return ctx.json({ message: "Authorization header is missing" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    ctx.status(401)

    return ctx.json({ message: "Auth token is not supplied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ctx.req.userData = decoded
    await next()
  } catch (error) {
    ctx.status(401)

    return ctx.json({
      message: "Auth failed",
      error: error.message
    })
  }
}

module.exports = { authMiddleware }
