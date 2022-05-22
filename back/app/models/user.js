'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  })
  User.associate = (models) => {
    User.hasMany(models.Comment, {
      as: "comment",
      foreignKey: "userId"
    });
    User.hasMany(models.commentReply, {
      as: "commentReply",
      foreignKey: "userId"
    });
    User.hasMany(models.commentReport, {
      as: "commentReport",
      foreignKey: "userId"
    });
    User.belongsToMany(models.Community, {
      through: "moderators",
      as: "communityModerator"
    });
    User.hasMany(models.Community, {
      as: 'community',
      foreignKey: "creatorId"
    });
    User.belongsToMany(models.Community, {
      through: "followers",
      as: "communityFollower"
    });
    User.hasMany(models.communityReport, {
      as: "communityReport",
      foreignKey: "userId"
    });
    User.hasMany(models.likeComment, {
      as: "likeComment",
      foreignKey: "userId"
    });
    User.hasMany(models.likePost, {
      as: "likePost",
      foreignKey: "userId"
    });
    User.hasMany(models.likeReply, {
      as: "likeReply",
      foreignKey: "userId"
    });
    User.hasMany(models.Notification, {
      as: "notification",
      foreignKey: "userId"
    });
    User.hasMany(models.Post, {
      as: "post",
      foreignKey: "authorId"
    });
    User.hasMany(models.postReport, {
      as: "postReport",
      foreignKey: "userId"
    });
    User.hasMany(models.privateMessage, {
      as: "messageAuthor",
      foreignKey: "authorId"
    });
    User.hasMany(models.privateMessage, {
      as: "messageReceiver",
      foreignKey: "receiverId"
    });
    User.hasMany(models.userReport, {
      as: "fromUser",
      foreignKey: "userFromId"
    });
    User.hasMany(models.userReport, {
      as: "toUser",
      foreignKey: "userToId"
    });
  }
  return User
}
