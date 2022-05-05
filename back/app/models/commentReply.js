'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReply = sequelize.define("commentReply", {
    reply: DataTypes.TEXT,
  })
  commentReply.associate = (models) => {
    commentReply.belongsTo(models.Comment, {
      // as: "postCommentReply"
    });
    commentReply.belongsTo(models.User, {
      // as: "userCommentReply"
    });
    commentReply.hasMany(models.likeReply, {
      as: "likeReplies",
      //foreignKey: "replyLikeId"
    });
  }
  return commentReply
}

