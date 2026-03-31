import { Router } from 'express';

import authController from '../../controllers/auth.controller';
import { validateRequestBody } from '../../validators';
import {  loginSchema, registerSchema } from '../../validators/auth.validator';

const authRouter = Router();

authRouter.post('/register', validateRequestBody(registerSchema), authController.registerHandler);

authRouter.post('/login', validateRequestBody(loginSchema), authController.loginHandler);

authRouter.get('/authenticate-user', authController.isAuthenticatedHandler);    

export default authRouter;