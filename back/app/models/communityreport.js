'use strict';
module.exports = (sequelize, DataTypes) => {
  const communityReport = sequelize.define("communityReport", {
    report: DataTypes.INTEGER
  })
  communityReport.associate = (models) => {
    communityReport.belongsTo(models.User, {
      as: "toCommunityUser",
      foreignKey: "userFromId"
    });
    communityReport.belongsTo(models.User, {
      as: "fromCommunityUser",
      foreignKey: "userToId"
    });
  };
  return communityReport
}
