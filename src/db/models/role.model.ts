import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Association,
  NonAttribute,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from './sequelize';
import User from './user.model';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>{
   declare id: CreationOptional<number>;
   declare name: string;

   declare users?:NonAttribute<User[]>;

    // declare getUsers: BelongsToManyGetAssociationsMixin<any>;

    static associations: {
        user:Association<Role,User>;
    }
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

},{
    tableName: 'roles',
    sequelize,
})

export default Role;