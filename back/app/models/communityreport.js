'use strict';
module.exports = (sequelize, DataTypes) => {
  const communityReport = sequelize.define("communityReport", {
    content: DataTypes.TEXT
  })
  communityReport.associate = (models) => {
    communityReport.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
    communityReport.belongsTo(models.Community, {
      as: "community",
      foreignKey: "communityId"
    });
  };
  return communityReport
}
