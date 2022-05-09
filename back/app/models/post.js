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
    Post.hasMany(models.Comment, {
      as: "commentParent"
    });
    Post.belongsTo(models.Community, {
      as: "community"
    });
    Post.hasMany(models.likePost, {
      as: "likePosts",
    });
    Post.hasMany(models.Comment, {
      as: "post",
      foreignKey: "postId"
    });

  };
  return Post
}