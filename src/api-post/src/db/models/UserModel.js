import BaseModel from "./BaseModel.js"
import PostModel from "./PostModel.js"

class UserModel extends BaseModel {
  static tableName = "users"

  static get relationMappings() {
    return {
      postsOwned: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "users.id",
          to: "posts.ownerId",
        },
      },
    }
  }
}

export default UserModel
