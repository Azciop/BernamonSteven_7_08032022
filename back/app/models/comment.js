'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.user, {
        foreignKey: "idUser",
        as: "author",
      });
      comment.belongsTo(models.post, {
        foreignKey: "idPost",
        as: "post",
      });
      comment.belongsTo(models.comment, {
        foreignKey: "idComment",
        as: "commentParent",
      });
      comment.hasMany(models.comment);
      comment.hasMany(models.likeComment, {
        as: "likeComment",
      });
    }
  }
  comment.init({
    idComment: DataTypes.INTEGER,
    LikeComment: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilPicture: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};