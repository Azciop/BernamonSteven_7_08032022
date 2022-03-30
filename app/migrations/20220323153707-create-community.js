'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('communities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcommunity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idadmin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      communityname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      communityPicture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      communityFollowers: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('communities');
  }
};