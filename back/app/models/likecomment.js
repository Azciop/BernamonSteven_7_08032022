'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeComment = sequelize.define("likeComment", {
    
  })
  likeComment.associate = (models) => {
    likeComment.belongsTo(models.Comment, {
         foreignKey: "commentId",
         as: "comment",
       });
       likeComment.belongsTo(models.User, {
         foreignKey: "userId",
         as: "user",
       });
       
  };
  return likeComment
}