// import { CreationAttributes, Transaction } from 'sequelize';

import User from '../db/models/user.model';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    // async create(data: CreationAttributes<User>, transaction?: Transaction ): Promise<User> {
    //     const record = await this.model.create(data, { transaction });
    //     return record;
    // }

    async findByEmail(email: string): Promise<User | null>{
        const checkUser = await this.model.findOne({where : {email}});
        return checkUser;
    }
    

    // async findById (id: number): Promise<User | null> {
    //     const user = await this.model.findByPk(id, {
    //         attributes: ['fullName','email', 'roleId', 'deletedAt', 'createdAt'],
    //         // include: [
    //         //     {
    //         //         association: User.associations.role,
    //         //         attributes: ['id','name']
    //         //     },
    //         //     {
    //         //         association: User.associations.tasks,
    //         //         attributes: ['id','name','description']
    //         //     },
    //         //     {
    //         //         association: User.associations.projects,
    //         //         attributes: ['id','name', 'description', 'createdAt']
    //         //     }
    //         // ]
    //     });
    //     return user;
    // }   
}

export default UserRepository;