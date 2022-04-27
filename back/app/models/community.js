'use strict';
module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define("Community", {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    followers: DataTypes.STRING
  })
  Community.associate = (models) => {
    Community.belongsTo(models.User, {
      foreignKey: "userId",
      as: "moderator"
    });
    Community.belongsToMany(models.User, {
      through: "followers",
      as: "users",
      foreignKey: "communityId"
    });
  };
  return Community
}
