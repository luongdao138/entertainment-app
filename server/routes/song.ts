import { Router } from 'express';
import songController from '../controllers/song';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();

router.use(verifyTokenMiddleware);
router
  .route('/upload')
  .get(songController.getUploadedSong)
  .post(songController.uploadSong);
router.route('/favourite').get(songController.getFavouriteSong);
router.route('/favourite/:songId').put(songController.addOrRemoveFavourite);

export default router;
