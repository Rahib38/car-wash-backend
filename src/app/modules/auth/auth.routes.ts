import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

export const authRouter = Router();
authRouter.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register,
);
