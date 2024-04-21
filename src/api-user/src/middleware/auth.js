import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      throw new Error("Auth token is not supplied")
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    })
  }
}