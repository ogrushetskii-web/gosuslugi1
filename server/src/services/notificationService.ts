import { TaskChannel } from '@prisma/client';
import { prisma } from '../config/prisma';
import { broadcastNotification } from '../websocket/server';

export const listNotifications = (familyId: string) => {
  return prisma.notification.findMany({ where: { familyId }, orderBy: { createdAt: 'desc' } });
};

export const createNotification = async (
  familyId: string,
  payload: { title: string; body: string; channel: TaskChannel; userId?: string }
) => {
  const notification = await prisma.notification.create({
    data: { ...payload, familyId }
  });
  broadcastNotification({ title: payload.title, body: payload.body });
  return notification;
};
