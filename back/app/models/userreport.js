'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reportUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reportUser.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "reportPost",
      });
      reportUser.belongsTo(models.comment, {
        foreignKey: "idComment",
        as: "reportedPost",
      });
    }
  }
  reportUser.init({
    idUser: DataTypes.INTEGER,
    reportUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userReport',
  });
  return reportUser;
};