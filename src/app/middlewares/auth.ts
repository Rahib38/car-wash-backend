import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../Errors/appErrors';
import { TUserRole } from '../modules/auth/auth.validation';
import { userModel } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const getTokenWithBearer = req?.headers.authorization;
    if (getTokenWithBearer) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'you ar not authorized to access this route!',
      );
    }
    const token = getTokenWithBearer?.split(' ')[1] || getTokenWithBearer;

    const decoded = jwt.verify(token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not allowed to access this route',
      );
    }
    req.user = decoded;
    next();
  });
};
export default auth;