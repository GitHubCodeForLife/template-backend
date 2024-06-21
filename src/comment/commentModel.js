import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";

class Comment extends Model {}
Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrementIdentity:true, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    productId: { type: DataTypes.INTEGER, allowNull: false},
    eggs: { type: DataTypes.INTEGER},
    content: { type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE},
  },
  {
    sequelize,
    modelName: "comments",
    // paranoid: true,
  }
);

export default Comment;
