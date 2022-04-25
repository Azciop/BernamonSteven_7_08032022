'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    postId: DataTypes.INTEGER,
    notification: DataTypes.STRING
  })
  Notification.associate = (models) => {
       Notification.belongsTo(models.User, {
         foreignKey: "userId",
         as: "user",
       });
       Notification.belongsTo(models.Post, {
         foreignKey: "postId",
         as: "post",
       });
  };
  return Notification
}