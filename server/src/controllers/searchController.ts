import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { quickSearch } from '../services/searchService';

export const searchController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const query = String(req.query.q ?? '');
  const results = await quickSearch(req.user!.familyId, query);
  res.json(results);
});
