import { Router } from 'express';
import {
  createTaskController,
  listTasksController,
  toggleTaskController
} from '../controllers/taskController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.get('/', listTasksController);
router.post('/', createTaskController);
router.post('/:id/toggle', toggleTaskController);

export default router;
