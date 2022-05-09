'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.TEXT,
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      as: "post"
    });
    Comment.belongsTo(models.User, {
      as: "user"
    });
    Comment.hasMany(models.commentReply, {
      // as: "postCommentReply",
      foreignKey: "commentReplyId"
    });
    Comment.hasMany(models.likeComment, {
      as: "likeComments",
      // foreignKey: "commentLikeId"
    });
  };
  return Comment
}
