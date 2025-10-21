import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { createTag, listTags } from '../services/tagService';

export const listTagsController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const tags = await listTags(req.user!.familyId);
  res.json(tags);
});

export const createTagController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const tag = await createTag(req.user!.familyId, req.body.name);
  res.status(201).json(tag);
});
