import { Router } from 'express';
import {
  listDocumentsController,
  updateDocumentController,
  uploadDocumentController,
  uploadMiddleware
} from '../controllers/documentController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listDocumentsController);
router.post('/', uploadMiddleware.single('file'), uploadDocumentController);
router.patch('/:id', updateDocumentController);

export default router;
