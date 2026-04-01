import { CreationAttributes } from 'sequelize';

import Task from '../db/models/task.model';
import BaseRepository from './base.repository';

class TaskRepository extends BaseRepository<Task>{
    constructor(){
        super(Task);
    }

    async createTask(data: CreationAttributes<Task>): Promise<Task> {
        const task = await this.model.create(data);
        return task;
    }
}

export default TaskRepository;