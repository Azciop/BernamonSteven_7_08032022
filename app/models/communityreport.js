'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communityreport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  communityreport.init({
    iduser: DataTypes.INTEGER,
    communityreport: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'communityreport',
  });
  return communityreport;
};