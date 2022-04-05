'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.comment, {
        foreignKey: "idComment",
        as: "author",
      });
      user.hasMany(models.commentreport, {
        foreignKey: "idUser",
        as: "reportedComment",
      });
      user.hasMany(models.community, { 
        foreignKey: "idCommunity",
        as: "community" ,
      });
      user.hasMany(models.communityreport, {
        foreignKey: "idUser",
        as: "reportedCommunity",
      });
      user.hasMany(models.likecomment, {
        foreignKey: "likeId",
        as: "likeComment",
      });
      user.hasMany(models.likepost, {
        foreignKey: "likeId",
        as: "likePost",
      });
      user.hasMany(models.post, {
        foreignKey: "idPost",
        as: "creator",
      });
      user.hasMany(models.postreport, {
        foreignKey: "idUser",
        as: "reportedPost",
      });
      user.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "user",
      });
      user.belongsTo(models.post, {
        foreignKey: "idPost",
        as: "post",
      });
      user.hasMany(models.userreport, {
        foreignKey: "idUser",
        as: "reportedUser",
      });
      user.hasMany(models.comment, {
        foreignKey: "idComment",
        as: "reply",
      });
    }
  }
  user.init({
    idUser: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};