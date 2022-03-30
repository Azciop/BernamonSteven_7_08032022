'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      notification.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "user",
      });
      notification.belongsTo(models.post, {
        foreignKey: "idPost",
        as: "post",
      });
    }
  }
  notification.init({
    idPost: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    notification: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};