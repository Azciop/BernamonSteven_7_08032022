'use strict';
module.exports = (sequelize, DataTypes) => {
  const communityReport = sequelize.define("communityReport", {
    reportCommunity: DataTypes.INTEGER
  })
  communityReport.associate = (models) => {
    communityReport.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userReportedCommunity",
    });
       communityReport.belongsTo(models.Community, {
         foreignKey: "commentId",
         as: "reportedComment",
       });
  };
  return communityReport
}
