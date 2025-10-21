import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { createTask, listTasks, toggleTask } from '../services/taskService';
import { createTaskSchema, toggleTaskSchema } from '../validators/taskValidators';

export const listTasksController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const tasks = await listTasks(req.user!.familyId);
  res.json(tasks);
});

export const createTaskController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = createTaskSchema.parse(req.body);
  const dueDate = payload.dueDate ? new Date(payload.dueDate) : undefined;
  const created = await createTask(req.user!.familyId, req.user!.id, {
    ...payload,
    dueDate
  });
  res.status(201).json(created);
});

export const toggleTaskController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = toggleTaskSchema.parse(req.body);
  const updated = await toggleTask(req.user!.familyId, req.params.id, payload.completed);
  res.json(updated);
});
