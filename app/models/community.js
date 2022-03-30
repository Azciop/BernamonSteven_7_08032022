use strict';
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
      // define association here
    }
  }
  community.init({
    idcommunity: DataTypes.INTEGER,
    idadmin: DataTypes.INTEGER,
    communityname: DataTypes.STRING,
    communityPicture: DataTypes.STRING,
    communityFollowers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'community',
  });
  return community;
};