import { z } from 'zod';

export const updateDocumentSchema = z.object({
  title: z.string().min(1).optional(),
  tags: z.array(z.string()).optional()
});
