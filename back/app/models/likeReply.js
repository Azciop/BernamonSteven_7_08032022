'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeReply = sequelize.define("likeReply", {
    content: DataTypes.TEXT,
  })
  likeReply.associate = (models) => {
    likeReply.belongsTo(models.commentReply, {
      as: "reply"
    });
    likeReply.belongsTo(models.User, {
       as: "user"
    });
  };
  return likeReply
}