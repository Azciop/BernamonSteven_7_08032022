'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: DataTypes.TEXT,
    image: DataTypes.STRING
  })
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
        as: "author"
    });
    Post.belongsTo(models.Community, {
      as: "community"
    });
    Post.hasMany(models.likePost, {
      as: "likePost",
      foreignKey: "postId"
    });
    Post.hasMany(models.Comment, {
      as: "post",
      foreignKey: "postId"
    });
    Post.hasMany(models.postReport, {
      as: "postReport",
      foreignKey: "postId"
    })
  };
  return Post
}