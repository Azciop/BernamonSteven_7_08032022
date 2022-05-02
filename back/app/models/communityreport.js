'use strict';
module.exports = (sequelize, DataTypes) => {
  const communityReport = sequelize.define("communityReport", {
    report: DataTypes.INTEGER
  })
  communityReport.associate = (models) => {
    communityReport.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userReportedCommunity",
    });
       communityReport.belongsTo(models.Community, {
         foreignKey: "communityId",
         as: "reportedComment",
       });
  };
  return communityReport
}
