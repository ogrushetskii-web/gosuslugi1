import { prisma } from '../config/prisma';

export const quickSearch = async (familyId: string, query: string) => {
  const cases = await prisma.case.findMany({
    where: {
      familyId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 5
  });

  const documents = await prisma.document.findMany({
    where: {
      familyId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { ocrText: { contains: query, mode: 'insensitive' } }
      ]
    },
    take: 5
  });

  const tags = await prisma.tag.findMany({
    where: { familyId, name: { contains: query, mode: 'insensitive' } },
    take: 5
  });

  return { cases, documents, tags };
};
