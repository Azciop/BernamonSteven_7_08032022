'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('communityAdmins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idadmin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      communityAdmins: {
        allowNull: false,
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
    await queryInterface.dropTable('communityAdmins');
  }
};