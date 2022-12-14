'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let people = [];

    for (let i = 1; i < 30; i++) {

      people.push({
        name: `person ${i}`,
        email: `/ ${i}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    let todos = [];

    for (let i = 1; i < 3; i++) {

      todos.push({
        name: `person 1 #${i}`,
       person_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    for (let i = 1; i < 3; i++) {

      todos.push({
        name: `person 1 #${i}`,
              person_id: 2,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    await queryInterface.bulkInsert('people', people);
    await queryInterface.bulkInsert('todos', todos);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('todos', null, {});
    await queryInterface.bulkDelete('people', null, {});
  }
};
