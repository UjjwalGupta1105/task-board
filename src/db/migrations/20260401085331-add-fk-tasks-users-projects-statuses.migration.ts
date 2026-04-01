import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      ALTER TABLE tasks
      ADD CONSTRAINT fk_tasks_users_assigned_from
        FOREIGN KEY (assigned_from) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE CASCADE,

      ADD CONSTRAINT fk_tasks_users_assigned_to
        FOREIGN KEY (assigned_to) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE CASCADE,

      ADD CONSTRAINT fk_tasks_projects_projectId
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON UPDATE CASCADE ON DELETE CASCADE,

      ADD CONSTRAINT fk_tasks_statuses_statusId
        FOREIGN KEY (status_id) REFERENCES statuses(id)
        ON UPDATE CASCADE ON DELETE SET CASCADE;
    `);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
      ALTER TABLE tasks
      DROP FOREIGN KEY fk_tasks_users_assigned_from,
      DROP FOREIGN KEY fk_tasks_users_assigned_to,
      DROP FOREIGN KEY fk_tasks_projects_projectId,
      DROP FOREIGN KEY fk_tasks_statuses_statusId;
    `);
    }
};