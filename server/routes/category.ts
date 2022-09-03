import { Router } from 'express';
import categoryController from '../controllers/category';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();
router.use(verifyTokenMiddleware);

router.route('/').get(categoryController.getAllCategories);

export default router;
