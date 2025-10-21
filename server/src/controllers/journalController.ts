import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { listActivity } from '../services/journalService';

export const listActivityController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const logs = await listActivity(req.user!.familyId);
  res.json(logs);
});
