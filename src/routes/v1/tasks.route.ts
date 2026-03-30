import { Router } from 'express';
import { validateRequestBody } from '../../validators';
import { createTaskSchema } from '../../validators/tasks.validator';

const tasksRouter=Router();

tasksRouter.post('/',validateRequestBody(createTaskSchema),);