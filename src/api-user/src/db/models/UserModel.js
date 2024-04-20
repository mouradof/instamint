import BaseModel from "./BaseModel.js"
import crypto from "crypto"

class UserModel extends BaseModel {
  static tableName = "users"
  static idColumn = "id"

  static jsonSchema = {
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
    }
  }

  static generateVerifyToken() {
    return crypto.randomBytes(20).toString("hex")
  }
}

export default UserModel