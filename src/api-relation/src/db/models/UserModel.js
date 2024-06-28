import FollowModel from "./FollowModel.js";

class UserModel extends BaseModel {
  static tableName = "users";

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
      },
      followers: {
        relation: BaseModel.HasManyRelation,
        modelClass: FollowModel,
        join: {
          from: "users.id",
          to: "follows.followedId"
        }
      },
      following: {
        relation: BaseModel.HasManyRelation,
        modelClass: FollowModel,
        join: {
          from: "users.id",
          to: "follows.followerId"
        }
      }
    };
  }
}

export default UserModel;
