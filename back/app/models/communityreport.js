'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communityReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      communityReport.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "reportCommunity",
      });
      communityReport.belongsTo(models.community, {
        foreignKey: "idComment",
        as: "reportedComment",
      });
    }
  }
  communityReport.init({
    idUser: DataTypes.INTEGER,
    ReportCommunity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'communityreport',
  });
  return communityReport;
};