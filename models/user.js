'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    UserId: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Sex: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    JobTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};