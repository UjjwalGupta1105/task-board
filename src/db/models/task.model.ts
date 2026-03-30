import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';

import sequelize from './sequelize';
import Status from './status.model';
import User from './user.model';

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare assignedFrom: number;
    declare assignedTo: number;
    declare projectId: number;
    declare statusId: CreationOptional<number>;
    declare updatedAt: CreationOptional<Date | null>;
    declare deadline: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date | null>;

    declare assigner?: NonAttribute<User>;
    declare assignee?: NonAttribute<User>;
    // declare project?: NonAttribute<Project>;
    declare status?: NonAttribute<Status>;

    static associations: {
        assigner:Association<User,Task>;
        assignee:Association<User,Task>;
        status:Association<Status,Task>;
        // projects:Association<User,any>;
    };
}

Task.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    assignedFrom: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },

    assignedTo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },

    projectId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },

    statusId: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    deadline: {
        type: DataTypes.DATE,
        defaultValue: null
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
       
    },

},{
    tableName: 'tasks',
    sequelize,
    underscored: true,
    timestamps: true
});

export default Task;