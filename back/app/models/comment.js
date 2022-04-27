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
      foreignKey: "commentId",
      as: "commentReplies",
    });
    Comment.belongsToMany(models.User, {
      through: "likers",
      as: "users",
      foreignKey: "likeId"
    });
  };
  return Comment
}
