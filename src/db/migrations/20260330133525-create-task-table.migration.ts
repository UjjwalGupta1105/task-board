import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(255) DEFAULT NULL,
        assigned_from INT UNSIGNED NOT NULL,
        assigned_to INT UNSIGNED NOT NULL,
        project_id INT UNSIGNED NOT NULL,
        status_id INT UNSIGNED DEFAULT 0,

        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deadline DATETIME DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS tasks;
    `);
    }
};