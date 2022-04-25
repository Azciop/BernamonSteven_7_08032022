'use strict';
module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define("Community", {
    communityId: DataTypes.INTEGER,
    moderatorId: DataTypes.INTEGER,
    communityName: DataTypes.STRING,
    communityPicture: DataTypes.STRING,
    communityFollowers: DataTypes.STRING
  })
  Community.associate = (models) => {
    Community.hasMany(models.Community, {
         as: "community",
         targetKey:"idCommunity"
       });
       Community.belongsTo(models.User, { 
         foreignKey: "idUser", 
        as: "communityModerator" 
      });
  };
  return Community
}
