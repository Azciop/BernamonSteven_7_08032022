'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userReport.init({
    iduser: DataTypes.INTEGER,
    userReport: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userReport',
  });
  return userReport;
};