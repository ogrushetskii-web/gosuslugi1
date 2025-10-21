import { Router } from 'express';
import { exportController } from '../controllers/exportController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', exportController);

export default router;
