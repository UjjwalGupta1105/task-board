import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import logger from '../configs/logger.config';
import { LoginUserDto, RegisterUserDto } from '../dtos/user.dto';
import UserRepository from '../repository/user.repository';
import { checkPassword, createToken, verifyToken } from '../utils/auth/auth';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../utils/errors/app.error';


class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createService(userData:RegisterUserDto){
        try {
            const checkUser = await this.userRepository.findByEmail(userData.email);
            console.log(checkUser);
            if(checkUser){
                throw new BadRequestError('User already exist!!');
            }

            const {fullName,email,password,roleId} =  userData;

            const response=await this.userRepository.create({fullName,email,password,roleId});
            console.log(response);
            const token= createToken({id:response.id,email:response.email});
            return {
                token:token,
                data: response 
            };
        } catch (error) {
            if(error instanceof BadRequestError) {
                throw error;
            }
            console.log(error);
            throw new InternalServerError('Facing some error while creating user');
        }
    }


    async loginService(userData: LoginUserDto){
        try {
            const checkUser = await this.userRepository.findByEmail(userData.email);

            if (!checkUser) {
                throw new NotFoundError('User not found');
            }
            
            const verified = await checkPassword(userData.password , checkUser.password);

            if(!verified) {
                throw new BadRequestError('Incorrect password');
            }

            const jwtToken = createToken({id: checkUser.id, email: checkUser.email});
            return jwtToken;

        } catch (error) {
            logger.error(error);
            if(error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error ;
            }
            throw new InternalServerError('Error while logging in');
        }
    }

    isAuthenticated(authToken: string){
        try {
            const decoded = verifyToken(authToken as string);
            return decoded;
            
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return new UnauthorizedError('Session expired. Please login again.');
            } else if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedError('Invalid token');
            } else {
                throw new UnauthorizedError('Verification of token failed');
            }
      
        }
    }
}
export default AuthService;