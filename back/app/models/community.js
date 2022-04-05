'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      community.hasMany(models.community, {
        as: "community",
        targetKey:"idCommunity"
      });
      community.belongsTo(models.user, { 
        foreignKey: "idUser", 
        as: "communityAdmin" 
      });
    }
  }
  community.init({
    idCommunity: DataTypes.INTEGER,
    idAdmin: DataTypes.INTEGER,
    communityName: DataTypes.STRING,
    communityPicture: DataTypes.STRING,
    communityFollowers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'community',
  });
  return community;
};