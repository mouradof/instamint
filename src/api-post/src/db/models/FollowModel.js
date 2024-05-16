import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"

class FollowModel extends BaseModel {
  static tableName = "follows"

  static get relationMappings() {
    return {
      follower: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "follows.followerId",
          to: "users.id"
        }
      },
      followed: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "follows.followedId",
          to: "users.id"
        }
      }
    }
  }
}

export default FollowModel
