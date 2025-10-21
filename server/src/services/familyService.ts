import { prisma } from '../config/prisma';

export const getFamilyProfile = (familyId: string) => {
  return prisma.family.findUnique({
    where: { id: familyId },
    include: {
      users: true,
      securitySetting: true
    }
  });
};

export const updateSecuritySettings = (familyId: string, data: { encryptionEnabled?: boolean; allowExternalSharing?: boolean }) => {
  return prisma.securitySetting.update({
    where: { familyId },
    data
  });
};
