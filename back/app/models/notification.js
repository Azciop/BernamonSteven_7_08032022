'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    notification: DataTypes.STRING
  })
  Notification.associate = (models) => {
       Notification.belongsTo(models.User, {
         foreignKey: "userId",
         as: "user",
       });
      };
  return Notification
}