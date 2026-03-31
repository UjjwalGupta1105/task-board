import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from './sequelize';

class Status extends Model<InferAttributes<Status>, InferCreationAttributes<Status>> {
    declare id: CreationOptional<number>;
    declare name: string;
}

Status.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'statuses',
    sequelize,
    underscored: true,
    timestamps: false
});

export default Status;
