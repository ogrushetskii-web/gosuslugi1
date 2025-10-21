import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  confirmEmail,
  disableTotp,
  login,
  register,
  requestPasswordReset,
  resetPassword,
  setupTotp
} from '../services/authService';
import {
  confirmSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  resetRequestSchema
} from '../validators/authValidators';

export const registerController = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body);
  const result = await register(payload);
  res.status(201).json(result);
});

export const confirmEmailController = asyncHandler(async (req, res) => {
  const payload = confirmSchema.parse(req.body);
  await confirmEmail(payload.email, payload.code);
  res.json({ success: true });
});

export const loginController = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const result = await login(payload.email, payload.password, payload.totp);
  res.json(result);
});

export const requestResetController = asyncHandler(async (req, res) => {
  const payload = resetRequestSchema.parse(req.body);
  await requestPasswordReset(payload.email);
  res.json({ success: true });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const payload = resetPasswordSchema.parse(req.body);
  await resetPassword(payload.email, payload.code, payload.newPassword);
  res.json({ success: true });
});

export const enableTotpController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.user) throw new Error('Unauthorized');
  const result = await setupTotp(req.user.id);
  res.json(result);
});

export const disableTotpController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  if (!req.user) throw new Error('Unauthorized');
  await disableTotp(req.user.id);
  res.json({ success: true });
});
