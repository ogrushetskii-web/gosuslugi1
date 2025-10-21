import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  addCaseComment,
  createCase,
  getCase,
  listCases,
  updateCaseStatus
} from '../services/caseService';
import { commentSchema, createCaseSchema, updateCaseStatusSchema } from '../validators/caseValidators';

export const listCasesController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const cases = await listCases(req.user!.familyId);
  res.json(cases);
});

export const createCaseController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = createCaseSchema.parse(req.body);
  const deadline = payload.deadline ? new Date(payload.deadline) : undefined;
  const created = await createCase(req.user!.familyId, req.user!.id, { ...payload, deadline });
  res.status(201).json(created);
});

export const getCaseController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const result = await getCase(req.user!.familyId, req.params.id);
  if (!result) {
    return res.status(404).json({ message: 'Дело не найдено' });
  }
  res.json(result);
});

export const updateStatusController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = updateCaseStatusSchema.parse(req.body);
  const updated = await updateCaseStatus(req.user!.familyId, req.params.id, payload.status, payload.progress);
  res.json(updated);
});

export const addCommentController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = commentSchema.parse(req.body);
  const comment = await addCaseComment(req.user!.familyId, req.params.id, req.user!.id, payload.content);
  res.status(201).json(comment);
});
