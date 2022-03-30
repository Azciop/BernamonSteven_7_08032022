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
      // define association here
    }
  }
  likePost.init({
    idpost: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER,
    likePost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likePost',
  });
  return likePost;
};