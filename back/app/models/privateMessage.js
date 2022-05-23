'use strict';
module.exports = (sequelize, DataTypes) => {
  const privateMessage = sequelize.define("privateMessage", {
   content: DataTypes.TEXT
  })
  privateMessage.associate = (models) => {
    privateMessage.belongsTo(models.User, {
      as: "messageAuthor",
      foreignKey: "authorId"
    });
    privateMessage.belongsTo(models.User, {
      as: "messageReceiver",
      foreignKey: "receiverId"
    });
  };
  return privateMessage
}

