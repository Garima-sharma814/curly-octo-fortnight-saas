import { ZodType, z } from 'zod';

export type userRegistrationProps = {
  type: string;
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<userRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullName: z.string().min(4, { message: 'Full name must be atleast 8 characters long' }),
    email: z.string().email({ message: 'Incorrect email format' }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be atleast 8 characters long' })
      .max(64, { message: 'Password cannot be longer then 64 characters long' })
      .refine((value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''), 'Password should contain only alphabets and numbers'),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'OTP should be a 6 digit number' }),
  })
  .refine(
    (schema) => {
      schema.password === schema.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  )
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  });
