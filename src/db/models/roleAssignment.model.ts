import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from './sequelize';

class RoleAssignmentRule extends Model<InferAttributes<RoleAssignmentRule>, InferCreationAttributes<RoleAssignmentRule>> {
    declare assigneeRoleId: number;
    declare assignerRoleId: number;
}

RoleAssignmentRule.init({
    assigneeRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    assignerRoleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'role_assignment_rules',
    sequelize,
    underscored: true,
    timestamps: false
});

export default RoleAssignmentRule;
