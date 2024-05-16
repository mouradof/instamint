import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class PostModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      owner: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.ownerId",
          to: "users.id"
        }
      }
    }
  }
}

export default PostModel
