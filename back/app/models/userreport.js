
'use strict';
module.exports = (sequelize, DataTypes) => {
  const userReport = sequelize.define("userReport", {
    reportUser: DataTypes.STRING
  })
  userReport.associate = (models) => {
    userReport.belongsTo(models.User, {
         foreignKey: "userId",
         as: "reportPost",
       });
       userReport.belongsTo(models.Comment, {
         foreignKey: "commentId",
         as: "reportedPost",
       });
  };
  return userReport
}