import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Auth token is not supplied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
      error: error.message
    })
  }
}
