import { Hono } from "hono"
import bcrypt from "bcrypt"
import UserModel from "../db/models/UserModel.js"
import sendVerificationEmail from "../helpers/emailHelper.js"
import { v4 as uuidv4 } from "uuid"
import pkg from "../../configAWS.cjs"

const generateUniqueFileName = originalFileName => {
  const uniqueId = uuidv4()
  const fileExtension = originalFileName.split(".").pop()

  return `${uniqueId}.${fileExtension}`
}

const prepareRouteRegister = ({ app }) => {
  const auth = new Hono()

  auth.post("/register", async c => {
    const body = await c.req.parseBody({ all: true })
    const { username, email, password, bio, profileImage, coverImage } = body

    try {
      const existingUser = await UserModel.query().where({ email }).first()

      if (existingUser) {
        return c.json({ message: "Email already in use" }, 409)
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      let profileImageUrl = "/images/default-profile-picture.jpg"
      let coverImageUrl = "/images/default-cover-picture.jpg"

      if (profileImage && profileImage.name) {
        const uniqueProfileImageName = generateUniqueFileName(profileImage.name)
        const profileImageBuffer = Buffer.from(await profileImage.arrayBuffer())
        const profileImageParams = {
          Bucket: process.env.BUCKET_NAME_S3,
          Key: uniqueProfileImageName,
          Body: profileImageBuffer,
          ContentType: profileImage.type
        }
        await pkg.upload(profileImageParams).promise()
        profileImageUrl = `https://${process.env.BUCKET_NAME_S3}.s3.amazonaws.com/${uniqueProfileImageName}`
      }

      if (coverImage && coverImage.name) {
        const uniqueCoverImageName = generateUniqueFileName(coverImage.name)
        const coverImageBuffer = Buffer.from(await coverImage.arrayBuffer())
        const coverImageParams = {
          Bucket: process.env.BUCKET_NAME_S3,
          Key: uniqueCoverImageName,
          Body: coverImageBuffer,
          ContentType: coverImage.type
        }
        await pkg.upload(coverImageParams).promise()
        coverImageUrl = `https://${process.env.BUCKET_NAME_S3}.s3.amazonaws.com/${uniqueCoverImageName}`
      }

      const newUser = await UserModel.query().insert({
        username,
        email,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        bio: bio || null,
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
        verifyToken: UserModel.generateVerifyToken(),
        emailVerified: false,
        isBanned: false,
        bannedUntil: null
      })

      await sendVerificationEmail(newUser.email, newUser.verifyToken)

      return c.json(
        {
          message: "User registered. Please check your email to verify your account."
        },
        201
      )
    } catch (error) {
      return c.json({ message: "Error registering user", error: error.message }, 500)
    }
  })

  app.route("/auth", auth)
}

export default prepareRouteRegister
