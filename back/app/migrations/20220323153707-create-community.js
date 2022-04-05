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
      idCommunity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idAdmin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      communityName: {
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