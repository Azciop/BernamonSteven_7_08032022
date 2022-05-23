'use strict';
module.exports = (sequelize, DataTypes) => {
  const postReport = sequelize.define("postReport", {
    content: DataTypes.TEXT
  })
  postReport.associate = (models) => {
    postReport.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
    postReport.belongsTo(models.Post, {
      as: "post",
      foreignKey: "postId"
    });
  };
  return postReport
}