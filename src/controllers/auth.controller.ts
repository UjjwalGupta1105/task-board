import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import logger from '../configs/logger.config';
import { LoginUserDto, RegisterUserDto } from '../dtos/user.dto';
import UserRepository from '../repository/user.repository';
import AuthService from '../services/auth.service';

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);


async function registerHandler(req: Request, res: Response, next: NextFunction) { 
    try {
        const requestBody: RegisterUserDto = req.body;
        const response = await authService.createService(requestBody);
        res.cookie('jwt', response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'User Created Successfully',
            data : response,
            error: {}
        });
    } catch (error) {
        logger.error('Error in registerHandler', { error });
        next(error);
    }
}
async function loginHandler(req: Request, res: Response, next: NextFunction) {
    try{
        const requestBody: LoginUserDto = req.body ;
        const response = await authService.loginService(requestBody);
        res.status(StatusCodes.ACCEPTED).json({
            success : true ,
            message : 'Login successfull' ,
            data : response ,
            error : {}

        });
    }catch(error){
        logger.error('Error in loginHandler', { error });
        next(error);
    }
}

async function isAuthenticatedHandler(req: Request, res: Response, next: NextFunction) {
    try{
        const token: string | undefined = req.headers.authorization ;
        const response = await authService.isAuthenticated(token);
        res.status(StatusCodes.ACCEPTED).json({
            success : true ,
            message : 'User is authenticated' ,
            data : response ,
            error : {}

        });
    }catch(error){
        logger.error('Error in isAuthenticatedHandler', { error });
        next(error);
    }
}

export default {
    registerHandler,
    loginHandler,
    isAuthenticatedHandler
};