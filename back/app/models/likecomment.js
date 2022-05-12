'use strict';
module.exports = (sequelize, DataTypes) => {
  const likeComment = sequelize.define("likeComment", {
    content: DataTypes.TEXT,
  })
  likeComment.associate = (models) => {
    likeComment.belongsTo(models.Comment, {
      as: "comment"
    });
    likeComment.belongsTo(models.User, {
       as: "user"
    });
  };
  return likeComment
} 