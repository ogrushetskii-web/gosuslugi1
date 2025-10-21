import { Router } from 'express';
import { listActivityController } from '../controllers/journalController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listActivityController);

export default router;
