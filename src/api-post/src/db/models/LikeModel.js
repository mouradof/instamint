import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import PostModel from "./PostModel.js"

class LikeModel extends BaseModel {
  static tableName = "likes"

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "likes.userId",
          to: "users.id"
        }
      },
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "likes.postId",
          to: "posts.id"
        }
      }
    }
  }
}

export default LikeModel
