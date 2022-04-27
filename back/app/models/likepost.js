'use strict';
module.exports = (sequelize, DataTypes) => {
  const likePost = sequelize.define("likePost", {
    like: DataTypes.STRING
  })
  likePost.associate = (models) => {
     likePost.belongsTo(models.Post, {
         foreignKey: "commentId",
         as: "post",
       });
       likePost.belongsTo(models.User, {
         foreignKey: "userId",
         as: "user",
       });
       
  };
  return likePost
}