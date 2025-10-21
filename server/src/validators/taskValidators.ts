import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(2),
  dueDate: z.string().optional(),
  channels: z.array(z.enum(['PUSH', 'EMAIL', 'SMS'])).optional()
});

export const toggleTaskSchema = z.object({
  completed: z.boolean()
});
