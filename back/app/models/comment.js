'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
    Comment.hasMany(models.commentReply, {
      foreignKey: "commentReplyId",
      as: "commentReply"
    });
    Comment.hasMany(models.likeComment, {
      foreignKey: "likeCommentId",
      as: "commentLike"
    })
  };
  return Comment
}
