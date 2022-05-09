'use strict';

var { faker } = require('@faker-js/faker')


const products = [...Array(10)].map( (product) => (
  {
    name: faker.commerce.productName(),
    price: parseInt(faker.finance.amount(1, 100, 0)),
    image_url: faker.image.business(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
))
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products', products, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
