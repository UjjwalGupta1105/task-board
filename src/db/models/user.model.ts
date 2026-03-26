import {
    // Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    // NonAttribute,
//   BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { hashPassword } from '../../utils/auth/auth';
import sequelize from './sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare email: string;
    declare password: string;
    declare roleId: CreationOptional<number | null>;
    declare deletedAt :CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date | null>;

    //    declare role?:NonAttribute<any>;
    //    declare tasks?:NonAttribute<any[]>;
    //    declare projects?:NonAttribute<any[]>;

    // declare getRoles: BelongsToManyGetAssociationsMixin<any>;
    // declare getSkills: BelongsToManyGetAssociationsMixin<any>;

    // static associations: {
    //     // role:Association<User,any>;
    //     // tasks:Association<User,any>;
    //     // projects:Association<User,any>;
    // };
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },

    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null
    }


},{
    hooks:{
        beforeSave :async (user: User) => {
            if (user.changed('password')) {
                user.password = await hashPassword(user.password);
            }}
    },
    tableName: 'users',
    sequelize,
    underscored: true,
    timestamps: true
});

export default User;