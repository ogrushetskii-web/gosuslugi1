import { Router } from 'express';
import authRoutes from './auth';
import caseRoutes from './cases';
import documentRoutes from './documents';
import taskRoutes from './tasks';
import agencyRoutes from './agencies';
import tagRoutes from './tags';
import notificationRoutes from './notifications';
import searchRoutes from './search';
import exportRoutes from './export';
import journalRoutes from './journal';
import familyRoutes from './families';

const router = Router();

router.use('/auth', authRoutes);
router.use('/families', familyRoutes);
router.use('/cases', caseRoutes);
router.use('/documents', documentRoutes);
router.use('/tasks', taskRoutes);
router.use('/agencies', agencyRoutes);
router.use('/tags', tagRoutes);
router.use('/notifications', notificationRoutes);
router.use('/search', searchRoutes);
router.use('/export', exportRoutes);
router.use('/journal', journalRoutes);

export default router;
