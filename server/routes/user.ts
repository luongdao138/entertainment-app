import { Router } from 'express';
import userController from '../controllers/user';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();

router.use(verifyTokenMiddleware);

router.get('/', userController.getLoggedInUser);

export default router;
