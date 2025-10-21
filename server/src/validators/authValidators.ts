import { z } from 'zod';

export const registerSchema = z.object({
  familyName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  totp: z.string().optional()
});

export const confirmSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4)
});

export const resetRequestSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4),
  newPassword: z.string().min(6)
});
