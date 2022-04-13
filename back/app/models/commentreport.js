'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      commentReport.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "reportComment",
      });
      commentReport.belongsTo(models.comment, {
        foreignKey: "idComment",
        as: "reportedComment",
      });
    }
  }
  commentReport.init({
    idUser: DataTypes.INTEGER,
    reportComment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentReport',
  });
  return commentReport;
};