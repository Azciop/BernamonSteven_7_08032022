'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReport = sequelize.define("commentReport", {
    report: DataTypes.STRING,
  })
  commentReport.associate = (models) => {
    commentReport.belongsTo(models.User, {
      as: "toCommentUser",
      foreignKey: "userFromId"
    });
    commentReport.belongsTo(models.User, {
      as: "fromCommentUser",
      foreignKey: "userToId"
    });
  };
  return commentReport
}
