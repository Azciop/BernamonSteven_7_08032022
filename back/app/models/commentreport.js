'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReport = sequelize.define("commentReport", {
    content: DataTypes.TEXT,
  })
  commentReport.associate = (models) => {
    commentReport.belongsTo(models.User, {
      as: "userTo",
      foreignKey: "userToId"
    });
    commentReport.belongsTo(models.User, {
      as: "userFrom",
      foreignKey: "userFromId"
    });
  };
  return commentReport
}
