import { QueryInterface } from 'sequelize';

export default {
    async up (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
         ALTER TABLE users
            ADD CONSTRAINT fk_users_roles_roleId
            FOREIGN KEY (role_id)
            REFERENCES roles(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE;
        `);
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.sequelize.query(`
         ALTER TABLE users
           DROP FOREIGN KEY fk_users_roles_roleId;
        `);
    }
};