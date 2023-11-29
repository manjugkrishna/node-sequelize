// eslint-disable-next-line no-unused-vars
const { Sequelize } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable('Book', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        bookname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bookPrice: {
          type: Sequelize.INTEGER,
          unique: true,
          allowNull: false,
        },
        bookAuthor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId:{
          type: Sequelize.UUID,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

      }),
    ]);
  },


  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Book');
  },
};