'use strict';
module.exports = (sequelize, DataTypes) => {
  const postReport = sequelize.define("postReport", {
    report: DataTypes.INTEGER
  })
  postReport.associate = (models) => {
    postReport.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userReportedPost",
    });
       postReport.belongsTo(models.Post, {
       as: "reportedPost",
       });
  };
  return postReport
}