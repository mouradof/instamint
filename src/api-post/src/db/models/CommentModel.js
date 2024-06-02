import BaseModel from "./BaseModel.js"

class CommentModel extends BaseModel {
  static get tableName() {
    return "comments"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["postId", "userId", "content"],
      properties: {
        id: { type: "integer" },
        postId: { type: "integer" },
        userId: { type: "integer" },
        content: { type: "string", minLength: 1, maxLength: 255 },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
      }
    }
  }
}

export default CommentModel
