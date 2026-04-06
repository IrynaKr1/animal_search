'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pets
      ADD CONSTRAINT check_lost_date_not_future
      CHECK (lost_date <= CURRENT_DATE)
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE pets
      ADD CONSTRAINT check_owner_full_name
      CHECK (owner ~ '^[A-Z][a-zA-Zà-žÀ-Ž]+ [A-Z][a-zA-Zà-žÀ-Ž]+$')
    `);
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pets DROP CONSTRAINT IF EXISTS check_lost_date_not_future
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE pets DROP CONSTRAINT IF EXISTS check_owner_full_name
    `);
  },
};
