import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import TeabagModel from "./TeabagModel.js"

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
      },
      teabag: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TeabagModel,
        join: {
          from: "posts.teabagId",
          to: "teabags.id"
        }
      }
    }
  }
}

export default PostModel
