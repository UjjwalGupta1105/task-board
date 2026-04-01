import { Router } from 'express';

import tasksController from '../../controllers/tasks.controller';
import { validateRequestBody } from '../../validators';
import { createTaskSchema } from '../../validators/tasks.validator';

const tasksRouter=Router();

tasksRouter.post('/create-task',validateRequestBody(createTaskSchema),tasksController.createTasksHandler);

export default tasksRouter;