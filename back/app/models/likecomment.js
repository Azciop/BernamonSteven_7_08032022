'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeComment = sequelize.define("likeComment", {

  })
  likeComment.associate = (models) => {
    likeComment.belongsTo(models.Comment, {
      as: "likeComments"
    });
    likeComment.belongsTo(models.User, {
      // as: "UserLikeComments"
    });
  };
  return likeComment
}