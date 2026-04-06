'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('pets', {
      fields: ['lost_date'],
      type: 'check',
      name: 'check_lost_date_not_future',
      where: {
        lost_date: {
          [Sequelize.Op.lte]: Sequelize.literal('CURRENT_DATE'),
        },
      },
    });

    await queryInterface.sequelize.query(`
  ALTER TABLE pets
  ADD CONSTRAINT check_owner_full_name
  CHECK (owner ~ '^[A-Z][a-zA-Zà-žÀ-Ž]+ [A-Z][a-zA-Zà-žÀ-Ž]+$')
`);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('pets', 'check_lost_date_not_future');
    await queryInterface.sequelize.query(
      `ALTER TABLE pets DROP CONSTRAINT check_owner_full_name`
    );
  },
};
