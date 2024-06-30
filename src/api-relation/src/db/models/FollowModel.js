import BaseModel from "./BaseModel.js"

class FollowModel extends BaseModel {
  static tableName = "follows"

  static get relationMappings() {
    const UserModel = require("./UserModel")

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
