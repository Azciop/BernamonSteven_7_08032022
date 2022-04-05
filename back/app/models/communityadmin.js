'use strict';
const {
  Model
} = require('sequelize');
const community = require('./community');
module.exports = (sequelize, DataTypes) => {
  class communityAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      communityAdmin.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "communityAdmin",
      });
      communityAdmin.belongsTo(models.community, {
        foreignKey: "communityId",
        as: "community",
      });
    }
  }
  communityAdmin.init({
    idAdmin: DataTypes.INTEGER,
    communityAdmins: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'communityAdmin',
  });
  return communityAdmin;
};