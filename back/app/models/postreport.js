'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      postReport.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "reportPost",
      });
      postReport.belongsTo(models.post, {
        foreignKey: "idComment",
        as: "reportedPost",
      });
    }
  }
  postReport.init({
    idUser: DataTypes.INTEGER,
    ReportPost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postreport',
  });
  return postReport;
};