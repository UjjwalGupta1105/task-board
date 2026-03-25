// import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { LoginUserDto, RegisterUserDto } from '../dtos/user.dto';
// import RoleRepository from '../repository/role.repository';
// import UserRepository from '../repository/user.repository';
// import UserProfileRepository from '../repository/userProfile.repository';
// import UserRoleRepository from '../repository/userRole.repository';
// import AuthService from '../services/auth.service';
// import logger from '../configs/logger.config';

// const userRepository = new UserRepository();
// const userProfileRepository = new UserProfileRepository();
// const userRoleRepository = new UserRoleRepository();
// const roleRepository = new RoleRepository();

// const authService = new AuthService(userRepository, userProfileRepository, roleRepository, userRoleRepository);


// async function registerHandler(req: Request, res: Response, next: NextFunction) { 
//     try {
//         const requestBody: RegisterUserDto = req.body;
//         const response = await authService.createService(requestBody);
//         res.status(StatusCodes.CREATED).json({
//             success: true,
//             message: 'User Created Successfully',
//             data : response,
//             error: {}
//         });
//     } catch (error) {
//         logger.error('Error in registerHandler', { error });
//         next(error);
//     }
// }
// async function loginHandler(req: Request, res: Response, next: NextFunction) {
//     try{
//         const requestBody: LoginUserDto = req.body ;
//         const response = await authService.loginService(requestBody);
//         res.status(StatusCodes.ACCEPTED).json({
//             success : true ,
//             message : 'Login successfull' ,
//             data : response ,
//             error : {}

//         });
//     }catch(error){
//         logger.error('Error in loginHandler', { error });
//         next(error);
//     }
// }

// export default {
//     registerHandler,
//     loginHandler
// };