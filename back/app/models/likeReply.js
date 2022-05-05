'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeReply = sequelize.define("likeReply", {

  })
  likeReply.associate = (models) => {
    likeReply.belongsTo(models.commentReply, {
      as: "likeReplies"
    });
    likeReply.belongsTo(models.User, {
      // as: "UserLikeReplies"
    });
  };
  return likeReply
}