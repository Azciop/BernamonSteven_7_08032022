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
     User.hasMany(models.commentReport, {
       foreignKey: "userId",
       as: "reportedComment",
     });
     User.hasMany(models.Community, {
       foreignKey: "communityId",
       as: "community",
     });
     User.hasMany(models.communityReport, {
       foreignKey: "userId",
       as: "reportedCommunity",
     });
     User.hasMany(models.likeComment, {
       foreignKey: "likeId",
       as: "likeComment",
     });
     User.hasMany(models.likePost, {
       foreignKey: "likeId",
       as: "likePost",
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
     User.hasMany(models.Comment, {
       foreignKey: "commentId",
       as: "reply",
     });
     User.hasMany(models.Notification, {
       foreignKey: "notificationId",
      as: "notifications",
    });
  }
  return User
}


