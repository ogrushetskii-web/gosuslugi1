import { Router } from 'express';
import { getFamilyController, updateSecurityController } from '../controllers/familyController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/me', getFamilyController);
router.patch('/security', updateSecurityController);

export default router;
