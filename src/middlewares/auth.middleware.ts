import { NextFunction, Request } from 'express';

import logger from '../configs/logger.config';
import UserRepository from '../repository/user.repository';
import { verifyToken } from '../utils/auth/auth';
import { NotFoundError, UnauthorizedError } from '../utils/errors/app.error';

const userRepository = new UserRepository();

export const isAuthenticatedMiddleware = (req: Request, next: NextFunction) => {
    try {
        const decoded = verifyToken(req.headers.authorization as string);
        const getUser=userRepository.findById(decoded.id);
        if(!getUser){
            throw new NotFoundError('User not found');
        }
        next();
            
    } catch (error) {
        logger.error(error);
        if(error instanceof NotFoundError) {
            throw error;
        }
        throw new UnauthorizedError('Verification of token failed');
    }

};