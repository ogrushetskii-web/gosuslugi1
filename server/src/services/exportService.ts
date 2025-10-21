import { promises as fs } from 'node:fs';
import path from 'node:path';
import { prisma } from '../config/prisma';

export const exportFamilyArchive = async (familyId: string) => {
  const [cases, documents, tasks] = await Promise.all([
    prisma.case.findMany({ where: { familyId } }),
    prisma.document.findMany({ where: { familyId } }),
    prisma.task.findMany({ where: { familyId } })
  ]);

  const payload = JSON.stringify({ cases, documents, tasks }, null, 2);
  const fileName = `family-export-${familyId}.json`;
  const destination = path.join(process.cwd(), 'uploads', fileName);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, payload);
  return { file: `/files/${fileName}` };
};
