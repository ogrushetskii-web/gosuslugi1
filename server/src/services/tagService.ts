import { prisma } from '../config/prisma';

export const listTags = (familyId: string) => {
  return prisma.tag.findMany({ where: { familyId }, include: { documents: true } });
};

export const createTag = (familyId: string, name: string) => {
  return prisma.tag.create({ data: { familyId, name } });
};
