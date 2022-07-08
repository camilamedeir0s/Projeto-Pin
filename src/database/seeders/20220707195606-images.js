'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'images',
      [
        {
          id: 1,
          avatar: "teste",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          avatar: "teste",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  }
};
