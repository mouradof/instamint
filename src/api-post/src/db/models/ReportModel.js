import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import PostModel from "./PostModel.js"

class ReportModel extends BaseModel {
  static tableName = "reports"

  static get idColumn() {
    return ["postId", "userId"]
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "reports.userId",
          to: "users.id"
        }
      },
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "reports.postId",
          to: "posts.id"
        }
      }
    }
  }
}

export default ReportModel
