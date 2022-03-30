'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likeComment.belongsTo(models.comment, {
        foreignKey: "idComment",
        as: "comment",
      });
      likeComment.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "user",
      });
    }
  }
  likeComment.init({
    idLike: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likeComment',
  });
  return likeComment;
};