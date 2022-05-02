'use strict';
module.exports = (sequelize, DataTypes) => {
    const commentReply = sequelize.define("commentReply", {
        reply: DataTypes.TEXT,
    })
    commentReply.associate = (models) => {
        commentReply.belongsTo(models.User, {
            foreignKey: "userId",
            as: "author",
        });
        commentReply.belongsTo(models.Comment, {
            as: "users",
            foreignKey: "commentReply"
        });
    };

    return commentReply
}

