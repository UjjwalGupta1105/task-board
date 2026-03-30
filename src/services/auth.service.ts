import logger from '../configs/logger.config';
import User from '../db/models/user.model';
import {  LoginUserDto, RegisterUserDto, UserResponse } from '../dtos/user.dto';
import UserRepository from '../repository/user.repository';
import { checkPassword, createToken, verifyToken } from '../utils/auth/auth';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../utils/errors/app.error';


class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createService(userData:RegisterUserDto) : Promise<UserResponse> {
        try {
            const checkUser = await this.userRepository.findByEmail(userData.email);
            if(checkUser){
                throw new BadRequestError('User already exist!!');
            }

            const {fullName,email,password,roleId} =  userData;

            const response=await this.userRepository.create({fullName,email,password,roleId});
            const token= createToken({id:response.id,email:response.email});
            const userResponse: UserResponse = {
                id: response.id,
                fullName: response.fullName,
                email: response.email,
                token: token
            };

            return userResponse;
            
        } catch (error) {
            if(error instanceof BadRequestError) {
                throw error;
            }
            throw new InternalServerError('Facing some error while creating user');
        }
    }


    async loginService(userData: LoginUserDto): Promise<UserResponse> {
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
            const userResponse: UserResponse = {
                id: checkUser.id,
                fullName: checkUser.fullName,
                email: checkUser.email,
                token: jwtToken
            };

            return userResponse;

        } catch (error) {
            logger.error(error);
            if(error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error ;
            }
            throw new InternalServerError('Error while logging in');
        }
    }

    async isAuthenticated(authToken: string): Promise<User | null> {
        try {
            const decoded = verifyToken(authToken as string);
            const getUser=await this.userRepository.findById(decoded.id);
            if(!getUser){
                throw new NotFoundError('User not found');
            }
            return getUser;
            
        } catch (error) {
            logger.error(error);
            throw new UnauthorizedError('Verification of token failed');
        }
    }
}

export default AuthService;