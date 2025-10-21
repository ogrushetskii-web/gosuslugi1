import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { listDocuments, updateDocumentMetadata, uploadDocument } from '../services/documentService';
import { updateDocumentSchema } from '../validators/documentValidators';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage });

export const listDocumentsController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const documents = await listDocuments(req.user!.familyId);
  res.json(documents);
});

export const uploadDocumentController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const file = (req as AuthenticatedRequest & { file?: Express.Multer.File }).file;
  if (!file) {
    return res.status(400).json({ message: 'Файл обязателен' });
  }
  const created = await uploadDocument({
    familyId: req.user!.familyId,
    uploaderId: req.user!.id,
    caseId: req.body.caseId,
    file
  });
  res.status(201).json(created);
});

export const updateDocumentController = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const payload = updateDocumentSchema.parse(req.body);
  const updated = await updateDocumentMetadata(req.user!.familyId, req.params.id, payload);
  res.json(updated);
});
