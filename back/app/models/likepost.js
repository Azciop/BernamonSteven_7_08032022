'use strict';
module.exports = (sequelize, DataTypes) => {
  const likePost = sequelize.define("likePost", {
    content: DataTypes.TEXT,
  })
  likePost.associate = (models) => {
    likePost.belongsTo(models.Post, {
      as: "post"
    });
    likePost.belongsTo(models.User, {
       as: "user"
    });
  };
  return likePost
}