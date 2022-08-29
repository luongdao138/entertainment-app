import { Router } from 'express';
import userController from '../controllers/user';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();

router.use(verifyTokenMiddleware);

router.get('/', userController.getLoggedInUser);
router.put('/updateProfile', userController.updateProfile);
router.put('/resetPassword', userController.resetPassword);

export default router;
