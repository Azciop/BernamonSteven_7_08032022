
'use strict';
module.exports = (sequelize, DataTypes) => {
  const userReport = sequelize.define("userReport", {
    message: DataTypes.STRING
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