import * as z from 'zod';

export const UserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Email is required',
      })
      .min(6, 'Minimum password length 4'),
  }),
});
