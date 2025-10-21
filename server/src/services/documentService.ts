import { nanoid } from 'nanoid';
import * as Tesseract from 'tesseract.js';
import { prisma } from '../config/prisma';
import { storageAdapter } from '../config/storage';
import { logActivity } from '../utils/activityLogger';

export const listDocuments = async (familyId: string) => {
  return prisma.document.findMany({
    where: { familyId },
    include: { tags: { include: { tag: true } }, versions: true }
  });
};

export const uploadDocument = async (params: {
  familyId: string;
  uploaderId: string;
  file: Express.Multer.File;
  caseId?: string;
}) => {
  const key = `${params.familyId}/${Date.now()}-${params.file.originalname}`;
  const location = await storageAdapter.upload(key, params.file.buffer, params.file.mimetype);
  const ocr = await Tesseract.recognize(params.file.buffer, 'rus+eng');

  const doc = await prisma.document.create({
    data: {
      title: params.file.originalname,
      path: location,
      mimeType: params.file.mimetype,
      size: params.file.size,
      ocrText: ocr.data.text,
      familyId: params.familyId,
      uploaderId: params.uploaderId,
      caseId: params.caseId ?? null,
      versions: {
        create: {
          path: location,
          version: 1
        }
      }
    }
  });

  const keywords = ocr.data.text
    .split(/\s+/)
    .filter((word) => word.length > 4)
    .slice(0, 5);

  for (const keyword of keywords) {
    const tag = await prisma.tag.upsert({
      where: { name_familyId: { name: keyword.toLowerCase(), familyId: params.familyId } },
      update: {},
      create: { name: keyword.toLowerCase(), familyId: params.familyId }
    });
    await prisma.documentTag.create({ data: { documentId: doc.id, tagId: tag.id } });
  }

  await logActivity({ familyId: params.familyId, userId: params.uploaderId, action: 'document.uploaded', metadata: { documentId: doc.id } });
  return doc;
};

export const updateDocumentMetadata = async (
  familyId: string,
  id: string,
  data: { title?: string; tags?: string[] }
) => {
  const updated = await prisma.document.update({
    where: { id },
    data: { title: data.title },
    include: { tags: { include: { tag: true } } }
  });

  if (data.tags) {
    await prisma.documentTag.deleteMany({ where: { documentId: id } });
    for (const name of data.tags) {
      const tag = await prisma.tag.upsert({
        where: { name_familyId: { name, familyId } },
        update: {},
        create: { name, familyId }
      });
      await prisma.documentTag.create({ data: { documentId: id, tagId: tag.id } });
    }
  }

  await logActivity({ familyId, action: 'document.updated', metadata: { documentId: id } });
  return updated;
};
