import { prisma } from '../config/prisma';

export const listActivity = (familyId: string) => {
  return prisma.activityLog.findMany({
    where: { familyId },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
};
