import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      ALTER TABLE comments
      ADD CONSTRAINT fk_comments_users_userId
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE CASCADE,

      ADD CONSTRAINT fk_comments_tasks_taskId
        FOREIGN KEY (task_id) REFERENCES tasks(id)
        ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      ALTER TABLE comments
      DROP FOREIGN KEY fk_comments_users_userId,
      DROP FOREIGN KEY fk_comments_tasks_taskId;
    `);
    }
};