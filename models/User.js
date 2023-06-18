const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const {compareSync} = require("bcrypt");

class User extends Model {
    // checkPassword(loginPw) {
    //     return compareSync(loginPw, this.password);
    // }
    checkPassword(password) {
        return password === this.password;
    }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
