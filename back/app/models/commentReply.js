'use strict';
module.exports = (sequelize, DataTypes) => {
    const commentReply = sequelize.define("commentReply", {
        Reply: DataTypes.TEXT,
    })
    commentReply.associate = (models) => {
        commentReply.belongsTo(models.User, {
            foreignKey: "userId",
            as: "author",
        });
        commentReply.belongsTo(models.Post, {
            foreignKey: "postId",
            as: "post",
        });
        commentReply.belongsToMany(models.User, {
            through: "replyLikers",
            as: "Users",
            foreignKey: "replyLikeId"
        });
    };

    return commentReply
}

