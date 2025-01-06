import { z } from 'zod';

const userValidationSchema = z.object({
body:z.object({
  name: z.string({ required_error: 'Name must be provide!' }),
  email: z.string({ required_error: 'Email must be provide!' }).email(),
  password: z
    .string({ required_error: 'password must be provide!' })
    .max(20, { message: 'password can not more than 20 character! ' }),
    phone:z.string(),
    address:z.string(),
    role:z.string()
})
});
export const userValidation = {
  userValidationSchema,
};
