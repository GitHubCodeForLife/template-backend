import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class Seller extends Model {}

Seller.init(
  {
    email: {
      type: DataTypes.STRING,
      defaultValue: "",
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    idCardNumber: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    taxCode: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    frontIdCardImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    backIdCardImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    portrait: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "Seller",
    paranoid: true,
  }
);

export default Seller;
