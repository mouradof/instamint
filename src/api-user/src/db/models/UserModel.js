import BaseModel from "./BaseModel.js"
import crypto from "crypto"

class UserModel extends BaseModel {
  static get tableName() {
    return "users"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "passwordHash", "passwordSalt"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        passwordHash: { type: "string", minLength: 1 },
        passwordSalt: { type: "string", minLength: 1 },
        bio: { type: ["string", "null"], maxLength: 1024 },
        verifyToken: { type: ["string", "null"], maxLength: 255 },
        emailVerified: { type: "boolean", default: false },
        followers: { type: "integer" },
        following: { type: "integer" },
        profileImage: { type: "string", minLength: 1, maxLength: 255 },
        coverImage: { type: "string", minLength: 1, maxLength: 255 },
        lastLoginDate: { type: "string", format: "date-time" },
        role: { type: "string", enum: ["role_user", "role_admin", "role_superadmin"] },
        isBanned: { type: "boolean", default: false },
        bannedUntil: { type: ["string", "null"], format: "date-time" }
      }
    }
  }

  static generateVerifyToken() {
    return crypto.randomBytes(20).toString("hex")
  }
}

export default UserModel
