import { Router } from 'express';
import {
  createNotificationController,
  listNotificationsController
} from '../controllers/notificationController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listNotificationsController);
router.post('/', createNotificationController);

export default router;
