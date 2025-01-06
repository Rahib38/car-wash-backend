/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleCastError } from '../Errors/handleCastError';
import { handleDuplicateError } from '../Errors/handleDuplicateError';
import { handleGenericError } from '../Errors/handleGenericError';
import { handleZodError } from '../Errors/handleZodError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleDuplicateError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
