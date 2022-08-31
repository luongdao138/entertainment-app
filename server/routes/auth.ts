import { Router } from 'express';
import authController from '../controllers/auth';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/forgotPassword', authController.verifyForgotPassword);
router.post('/resendVerify', authController.resendEmail);
router.post('/changePassword', authController.changePassword);

export default router;
