import BaseModel from "./BaseModel.js"
import UserModel from "./UserModel.js"
import GroupMemberModel from "./GroupMemberModel.js"
import PostModel from "./PostModel.js"

class TeabagModel extends BaseModel {
  static tableName = "teabags"

  static get relationMappings() {
    return {
      owner: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "teabags.ownerId",
          to: "users.id"
        }
      },
      groupMembers: {
        relation: BaseModel.HasManyRelation,
        modelClass: GroupMemberModel,
        join: {
          from: "teabags.id",
          to: "groupMembers.teabagId"
        }
      },
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "teabags.id",
          to: "posts.teabagId"
        }
      }
    }
  }
}

export default TeabagModel
