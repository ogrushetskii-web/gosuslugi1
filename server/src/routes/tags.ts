import { Router } from 'express';
import { createTagController, listTagsController } from '../controllers/tagController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listTagsController);
router.post('/', createTagController);

export default router;
