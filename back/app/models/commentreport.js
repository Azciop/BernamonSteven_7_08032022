'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReport = sequelize.define("commentReport", {
    content: DataTypes.TEXT,
  })
  commentReport.associate = (models) => {
    commentReport.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
    commentReport.belongsTo(models.Comment, {
      as: "comment",
      foreignKey: "commentId"
    });
  };
  return commentReport
}
