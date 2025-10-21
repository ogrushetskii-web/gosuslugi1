import { Router } from 'express';
import {
  addCommentController,
  createCaseController,
  getCaseController,
  listCasesController,
  updateStatusController
} from '../controllers/caseController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listCasesController);
router.post('/', createCaseController);
router.get('/:id', getCaseController);
router.post('/:id/status', updateStatusController);
router.post('/:id/comments', addCommentController);

export default router;
