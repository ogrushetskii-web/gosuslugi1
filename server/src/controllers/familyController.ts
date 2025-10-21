import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { getFamilyProfile, updateSecuritySettings } from '../services/familyService';

export const getFamilyController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const family = await getFamilyProfile(req.user!.familyId);
  res.json(family);
});

export const updateSecurityController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const updated = await updateSecuritySettings(req.user!.familyId, req.body);
  res.json(updated);
});
