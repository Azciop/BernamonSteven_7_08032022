'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    content: DataTypes.STRING
  })
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: "user"
    })
  };
  return Notification
}