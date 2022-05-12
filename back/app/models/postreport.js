'use strict';
module.exports = (sequelize, DataTypes) => {
  const postReport = sequelize.define("postReport", {
    content: DataTypes.TEXT
  })
  postReport.associate = (models) => {
    postReport.belongsTo(models.User, {
      as: "toPostUser",
      foreignKey: "userFromId"
    });
    postReport.belongsTo(models.User, {
      as: "fromPostUser",
      foreignKey: "userToId"
    });
  };
  return postReport
}