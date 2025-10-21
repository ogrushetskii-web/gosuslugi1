import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { exportFamilyArchive } from '../services/exportService';

export const exportController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const archive = await exportFamilyArchive(req.user!.familyId);
  res.json(archive);
});
