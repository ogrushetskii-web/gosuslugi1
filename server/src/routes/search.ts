import { Router } from 'express';
import { searchController } from '../controllers/searchController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', searchController);

export default router;
