'use strict';
module.exports = (sequelize, DataTypes) => {
  const communityModerator = sequelize.define("communityModerator", {
    
  })
  communityModerator.associate = (models) => {
    communityModerator.belongsTo(models.User, {
           foreignKey: "userId",
          as: "communityModerator",
          
       });
       communityModerator.belongsTo(models.Community, {
         foreignKey: "communityId",
           as: "community",
         });
  };
  return communityModerator
}
