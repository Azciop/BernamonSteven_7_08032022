'use strict';
module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define("Community", {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
  })
  Community.associate = (models) => {
    Community.belongsToMany(models.User, {
      through: "followers",
      as: "users",
      foreignKey: "communityId"
    });
    Community.hasMany(models.Post, {
      as: "community",
      foreignKey: "communityId",

    });
  };
  return Community
}
