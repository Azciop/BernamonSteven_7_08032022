'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: DataTypes.TEXT,
    contentImage: DataTypes.STRING
  })
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      as: "postAuthor"
    });
    Post.hasMany(models.Comment, {
      as: "commentParent"
    });
    Post.belongsTo(models.Community, {
      as: "post"
    });
    Post.hasMany(models.likePost, {
      as: "likePosts",
    });
    Post.hasMany(models.Comment, {
      as: "postComments",
      foreignKey: "postCommentsId"
    });

  };
  return Post
}