import logger from '../configs/logger.config';
import { CreateTaskDto } from '../dtos/tasks.dto';
import TaskRepository from '../repository/task.repository';
import { InternalServerError } from '../utils/errors/app.error';


class TaskService {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async createService(taskData: CreateTaskDto) {
        try {
            const task = await this.taskRepository.createTask(taskData);
            return task;
        } catch (error) {
            logger.error('Error in createTaskService', { error });
            throw new InternalServerError('Failed to create task');
        }
    }
}

export default TaskService;