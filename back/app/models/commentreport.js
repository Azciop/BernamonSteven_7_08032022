'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReport = sequelize.define("commentReport", {
    report: DataTypes.STRING,
  })
  commentReport.associate = (models) => {
      commentReport.belongsTo(models.User, {
         foreignKey: "userId",
         as: "userReportedComment",
       });
       commentReport.belongsTo(models.Comment, {
         foreignKey: "commentId",
        as: "reportedComment",
       });
  };
  return commentReport
}
