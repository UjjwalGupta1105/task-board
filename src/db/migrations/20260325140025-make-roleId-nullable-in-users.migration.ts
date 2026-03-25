import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY role_id INT UNSIGNED NULL DEFAULT NULL;
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY role_id INT UNSIGNED NOT NULL;
    `);
  }
};