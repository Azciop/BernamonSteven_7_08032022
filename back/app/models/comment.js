'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      as: "postComments"
    });
    Comment.belongsTo(models.User, {
      as: "commentAuthor"
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
