import BaseModel from './BaseModel.js'
import UserModel from './UserModel.js'
import TeabagModel from './TeabagModel.js'

class GroupMemberModel extends BaseModel {
  static tableName = 'groupMembers'

  static get relationMappings () {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'groupMembers.userId',
          to: 'users.id'
        }
      },
      teabag: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TeabagModel,
        join: {
          from: 'groupMembers.teabagId',
          to: 'teabags.id'
        }
      }
    }
  }
}

export default GroupMemberModel
