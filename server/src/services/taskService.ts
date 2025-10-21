import { TaskChannel } from '@prisma/client';
import { prisma } from '../config/prisma';
import { logActivity } from '../utils/activityLogger';

export const listTasks = (familyId: string) => {
  return prisma.task.findMany({
    where: { familyId },
    include: { channels: true }
  });
};

export const createTask = async (
  familyId: string,
  ownerId: string,
  payload: { title: string; dueDate?: Date; channels?: TaskChannel[] }
) => {
  const task = await prisma.task.create({
    data: {
      familyId,
      ownerId,
      title: payload.title,
      dueDate: payload.dueDate ?? null,
      channels: {
        create: (payload.channels ?? ['PUSH']).map((channel) => ({ channel }))
      }
    }
  });
  await logActivity({ familyId, userId: ownerId, action: 'task.created', metadata: { taskId: task.id } });
  return task;
};

export const toggleTask = async (familyId: string, id: string, completed: boolean) => {
  const task = await prisma.task.update({ where: { id }, data: { completed } });
  await logActivity({ familyId, action: 'task.updated', metadata: { taskId: id, completed } });
  return task;
};
