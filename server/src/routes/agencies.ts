import { Router } from 'express';
import {
  createAgencyController,
  listAgenciesController
} from '../controllers/agencyController';

const router = Router();

router.get('/', listAgenciesController);
router.post('/', createAgencyController);

export default router;
