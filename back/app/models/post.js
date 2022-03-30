'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "creator",
      });
      post.belongsTo(models.community, {
        foreignKey: "idCommunity",
        as: "category",
      });
      post.hasMany(models.comment, {
        foreignKey: "idComment",
        as: "comment",
      });
      post.hasMany(models.likePost, {
        foreignKey: "postId",
        as: "likePost",
      });
    }
  }
  post.init({
    idPost: DataTypes.INTEGER,
    likePost: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    postText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};