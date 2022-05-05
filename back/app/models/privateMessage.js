'use strict';
module.exports = (sequelize, DataTypes) => {
  const privateMessage = sequelize.define("privateMessage", {
    message: DataTypes.TEXT
  })
  privateMessage.associate = (models) => {
    privateMessage.belongsTo(models.User, {
      as: "messageAuthor"
    });
    privateMessage.belongsTo(models.User, {
      as: "messageReceiver"
    });
  };
  return privateMessage
}