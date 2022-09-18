import { Router } from 'express';
import songController from '../controllers/song';
import verifyTokenMiddleware from '../middlewares/verifyJwt';
import verifyNoTokenMiddleware from '../middlewares/verifyJwtNoToken';

const router = Router();

router
  .route('/upload')
  .get(verifyTokenMiddleware, songController.getUploadedSong)
  .post(verifyTokenMiddleware, songController.uploadSong);
router.get('/lyric', songController.getSongLyric);
router
  .route('/favourite')
  .get(verifyTokenMiddleware, songController.getFavouriteSong);
router
  .route('/recommend/:song_id')
  .post(verifyTokenMiddleware, songController.getRecommendedSongs);
router
  .route('/favourite/:songId')
  .put(verifyTokenMiddleware, songController.addOrRemoveFavourite);
router
  .route('/:song_id')
  .get(verifyNoTokenMiddleware, songController.getSongDetail)
  .put(verifyTokenMiddleware, songController.editSong)
  .delete(verifyTokenMiddleware, songController.deleteSong);

export default router;
