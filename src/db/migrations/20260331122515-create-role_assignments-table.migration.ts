import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS role_assignments (
        assigneeRoleId INT UNSIGNED NOT NULL,
        assignerRoleId INT UNSIGNED NOT NULL
      );
    `);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS role_assignments;
    `);
    }
};