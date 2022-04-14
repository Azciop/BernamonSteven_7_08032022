'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likePost.belongsTo(models.post, {
        foreignKey: "idComment",
        as: "post",
      });
      likePost.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "user",
      });
    }
  }
  likePost.init({
    idPost: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    likePost: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'likePost',
  });
  return likePost;
};