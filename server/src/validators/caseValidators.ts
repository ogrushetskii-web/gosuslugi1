import { z } from 'zod';

export const createCaseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  agencyId: z.string().optional(),
  deadline: z.string().optional()
});

export const updateCaseStatusSchema = z.object({
  status: z.enum(['WAITING', 'REVIEW', 'RECEIVED']),
  progress: z.number().int().min(0).max(100).optional()
});

export const commentSchema = z.object({
  content: z.string().min(1)
});
