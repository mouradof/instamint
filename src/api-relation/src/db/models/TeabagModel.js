import BaseModel from './BaseModel.js'
import UserModel from './UserModel.js'
import GroupMemberModel from './GroupMemberModel.js'

class TeabagModel extends BaseModel {
  static tableName = "teabags"

  static get relationMappings () {
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
      }
    }
  }
}

export default TeabagModel
