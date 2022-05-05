'use strict';
module.exports = (sequelize, DataTypes) => {
  const likePost = sequelize.define("likePost", {

  })
  likePost.associate = (models) => {
    likePost.belongsTo(models.Post, {
      as: "likePosts"
    });
    likePost.belongsTo(models.User, {
      //as: "UserLikePosts"
    });
  };
  return likePost
}