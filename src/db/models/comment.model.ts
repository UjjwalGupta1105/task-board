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
import { hashPassword } from '../../utils/auth/auth';
import User from './user.model';

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>{
   declare id: CreationOptional<number>;
   declare data: string;
   declare userId: number;
   declare taskId: number;
   declare createdAt: Date;

//    declare role?:NonAttribute<any>;
//    declare tasks?:NonAttribute<any[]>;
//    declare projects?:NonAttribute<any[]>;

    // declare getRoles: BelongsToManyGetAssociationsMixin<any>;
    // declare getSkills: BelongsToManyGetAssociationsMixin<any>;

    static associations: {
        role:Association<User,any>;
        tasks:Association<User,any>;
        projects:Association<User,any>;
    }
}


export default Comment;