
'use strict';
module.exports = (sequelize, DataTypes) => {
  const userReport = sequelize.define("userReport", {
    message: DataTypes.TEXT
  })
  userReport.associate = (models) => {
    userReport.belongsTo(models.User, {
      as: "toUser",
      foreignKey: "userFromId"
    });
    userReport.belongsTo(models.User, {
      as: "fromUser",
      foreignKey: "userToId"
    });
  };
  return userReport
}