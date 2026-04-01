import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import logger from '../configs/logger.config';
import { CreateTaskDto } from '../dtos/tasks.dto';
import TaskRepository from '../repository/task.repository';
import TaskService from '../services/task.services';

const taskRepository = new TaskRepository();
const taskService= new TaskService(taskRepository);

async function createTasksHandler(req: Request, res: Response, next: NextFunction){
    try {
        const requestBody:CreateTaskDto=req.body;
        const response=await taskService.createService(requestBody);
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:'Task created successfully',
            data:response,
            error:{}
        });
        
    } catch (error) {
        logger.error('Error in taskHandler', { error });
        next(error);
    }
}


export default {
    createTasksHandler,
};
