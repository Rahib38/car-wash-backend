import { z } from 'zod';
import { USER_ROLE } from './auth.interface';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be provided' }),
    password: z.string({ required_error: 'Password must be provided' }),
  }),
});
export const AuthValidation = {
  loginValidationSchema,
};
export type TUserRole = keyof typeof USER_ROLE;
