import { prisma } from '../config/prisma';

export const logActivity = async (params: {
  familyId: string;
  userId?: string;
  action: string;
  metadata?: Record<string, unknown>;
}) => {
  await prisma.activityLog.create({
    data: {
      familyId: params.familyId,
      userId: params.userId,
      action: params.action,
      metadata: params.metadata ?? {}
    }
  });
};
