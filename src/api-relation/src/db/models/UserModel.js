import BaseModel from "./BaseModel.js"
import TeabagModel from "./TeabagModel.js"
import GroupMemberModel from "./GroupMemberModel.js"

class UserModel extends BaseModel {
  static tableName = "users"

  static get relationMappings() {
    return {
      teabagsOwned: {
        relation: BaseModel.HasManyRelation,
        modelClass: TeabagModel,
        join: {
          from: "users.id",
          to: "teabags.ownerId"
        }
      },
      groupMemberships: {
        relation: BaseModel.HasManyRelation,
        modelClass: GroupMemberModel,
        join: {
          from: "users.id",
          to: "groupMembers.userId"
        }
      }
    }
  }
}

export default UserModel
