import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from './sequelize';

class ProjectUser extends Model<InferAttributes<ProjectUser>, InferCreationAttributes<ProjectUser>> {
    declare projectId: number;
    declare userId: number;
}

ProjectUser.init({
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
}, {
    tableName: 'project_users',
    sequelize,
    underscored: true,
    timestamps: false
});

export default ProjectUser;
