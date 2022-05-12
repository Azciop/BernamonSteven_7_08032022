'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentReply = sequelize.define("commentReply", {
    content: DataTypes.TEXT,
  })
  commentReply.associate = (models) => {
    commentReply.belongsTo(models.Comment, {
       as: "comment"
    });
    commentReply.belongsTo(models.User, {
       as: "user"
    });
    commentReply.hasMany(models.likeReply, {
      as: "likeReply",
     foreignKey: "replyId"
    });
  }
  return commentReply
}

