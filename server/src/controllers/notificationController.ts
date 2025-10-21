import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { createNotification, listNotifications } from '../services/notificationService';

export const listNotificationsController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const notifications = await listNotifications(req.user!.familyId);
  res.json(notifications);
});

export const createNotificationController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const notification = await createNotification(req.user!.familyId, {
    title: req.body.title,
    body: req.body.body,
    channel: req.body.channel,
    userId: req.user!.id
  });
  res.status(201).json(notification);
});
