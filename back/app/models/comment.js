'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    LikeComment: DataTypes.STRING,
    firstName: DataTypes.STRING,
    username: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    comment: DataTypes.TEXT
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
    Comment.hasMany(models.likeComment, {
      as: "likeComment",
      foreignKey: "commentId"
    });
  };
  return Comment
}
