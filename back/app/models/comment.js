'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: DataTypes.TEXT,
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      as: "post"
    });
    Comment.belongsTo(models.User, {
      as: "user"
    });
    Comment.hasMany(models.commentReply, {
       as: "commentReply",
      foreignKey: "commentId"
    });
    Comment.hasMany(models.likeComment, {
       as: "likeComment",
      foreignKey: "commentId"
     });
  };
  return Comment
}
