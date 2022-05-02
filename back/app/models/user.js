'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  })
  User.associate = (models) => {
    User.hasMany(models.Comment, {
      foreignKey: "commentId",
      as: "comments",
    });
    User.hasMany(models.commentReply, {
      as: "replyComment",
      foreignKey: "reply"
    });
    User.hasMany(models.commentReport, {
      foreignKey: "userId",
      as: "reportedComment",
    });

    User.belongsToMany(models.Community, {
      through: "followers",
      as: "communities",
      foreignKey: "userId"
    });
    User.hasMany(models.communityModerator, {
      as: "communityModerator",
      foreignKey: "ModeratorId"
    });
    User.hasMany(models.communityReport, {
      foreignKey: "userId",
      as: "reportedCommunity",
    });

    User.hasMany(models.likePost, {
      foreignKey: "likeId",
      as: "likePost",
    });
    User.hasMany(models.likeComment, {
      foreignKey: "likeCommentId",
      as: "likeComment",
    });
    User.hasMany(models.Notification, {
      as: "notifications",
    });

    User.hasMany(models.Post, {
      foreignKey: "postId",
      as: "creator",
    });
    User.hasMany(models.postReport, {
      foreignKey: "userId",
      as: "reportedPost",
    });
    User.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    User.hasMany(models.userReport, {
      foreignKey: "userId",
      as: "reportedUser",
    });
  }


  return User
}


