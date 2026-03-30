import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z
        .string({ required_error: 'Full name is required'})
        .min(4, { message: 'Full name must be at least 4 characters' })
        .max(50, { message: 'Full name must be less than 50 characters' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(32, { message: 'Password must be less than 32 characters' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }),
    roleId: z.number().int({ message: 'Role ID must be an integer' }).nullable().optional().default(null)
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' })
});

export const isAuthenticatedSchema = z.object({
    authToken: z.string({ required_error: 'Auth token is required' })
});