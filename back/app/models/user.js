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
      as: "commentAuthor",
      foreignKey: "commentAuthorId"
    });
    User.hasMany(models.commentReply, {
      // as: "userCommentReply",
      // foreignKey: "replyAuthorId"
    });
    User.hasMany(models.Post, {
      as: "postAuthor",
      //foreignKey: "authorId"
    });
    User.hasMany(models.commentReport, {
      as: "fromCommentUser",
      foreignKey: "userFromId"
    });
    User.hasMany(models.commentReport, {
      as: "toCommentUser",
      foreignKey: "userToId"
    });
    User.belongsToMany(models.Community, {
      through: "moderators",
      as: "communityModerator"
    });
    User.belongsToMany(models.Community, {
      through: "followers",
      as: "communityFollower"
    });
    User.hasMany(models.communityReport, {
      as: "FromCommunityUser",
      foreignKey: "userFromId"
    });
    User.hasMany(models.communityReport, {
      as: "toCommunityUser",
      foreignKey: "userToId"
    });
    User.hasMany(models.likeComment, {
      //as: "UserLikeComments"
    });
    User.hasMany(models.likePost, {
      //as: "UserLikePosts"
    });
    User.hasMany(models.likeReply, {
      //as: "UserLikeReplies"
    });
    User.hasMany(models.Notification, {
      as: "notifications"
    });
    User.hasMany(models.Post, {
      as: "postAuthor"
    });
    User.hasMany(models.postReport, {
      as: "FromPostUser",
      foreignKey: "userFromId"
    });
    User.hasMany(models.postReport, {
      as: "toPostUser",
      foreignKey: "userToId"
    });
    User.hasMany(models.privateMessage, {
      as: "messageAuthor"
    });
    User.hasMany(models.privateMessage, {
      as: "messageReceiver"
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


