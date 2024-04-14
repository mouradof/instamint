import BaseModel from "./BaseModel.js"

class TeabagModel extends BaseModel {
  static tableName = "teabags";

  static get relationMappings() {
    return {}
  }
}

export default TeabagModel
