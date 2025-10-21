import { Router } from 'express';
import {
  confirmEmailController,
  disableTotpController,
  enableTotpController,
  loginController,
  registerController,
  requestResetController,
  resetPasswordController
} from '../controllers/authController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerController);
router.post('/confirm', confirmEmailController);
router.post('/login', loginController);
router.post('/reset/request', requestResetController);
router.post('/reset/complete', resetPasswordController);
router.post('/totp/enable', requireAuth, enableTotpController);
router.post('/totp/disable', requireAuth, disableTotpController);

export default router;
