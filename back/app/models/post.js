'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    profilPicture: DataTypes.STRING
  })
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
         foreignKey: "userId",
         as: "creator",
       });
       Post.belongsTo(models.Community, {
         foreignKey: "communityId",
         as: "category",
       });
       Post.hasMany(models.Comment, {
         foreignKey: "commentId",
         as: "comments",
       });
       Post.hasMany(models.likePost, {
         foreignKey: "postId",
         as: "likePost",
       });
  };
  return Post
}