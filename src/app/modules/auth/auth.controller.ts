import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    success:true,
    message:"User register successfully",
    statusCode:StatusCodes.CREATED,
    data:result
  });
});
export const AuthController ={
    register  
}