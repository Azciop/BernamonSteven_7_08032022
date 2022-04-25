'use strict';
module.exports = (sequelize, DataTypes) => {
  const privateMessage = sequelize.define("privateMessage", {
    priveMessageId: DataTypes.INTEGER
  })
  privateMessage.associate = (models) => {
    privateMessage.belongsTo(models.User, {
         foreignKey: "fromUserId",
         as: "privateMessageFromUserId",
       });
       privateMessage.belongsTo(models.User, {
         foreignKey: "toUserId",
       as: "privateMessageToUserId",
       });
  };
  return privateMessage
}