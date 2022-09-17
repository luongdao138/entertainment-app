import { Router } from 'express';
import songController from '../controllers/song';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();

router.use(verifyTokenMiddleware);
router
  .route('/upload')
  .get(songController.getUploadedSong)
  .post(songController.uploadSong);
router.get('/lyric', songController.getSongLyric);
router
  .route('/history')
  .post(songController.addSongToRecentList)
  .get(songController.getHistorySongs);
router.route('/favourite').get(songController.getFavouriteSong);
router.route('/recommend/:song_id').post(songController.getRecommendedSongs);
router.route('/favourite/:songId').put(songController.addOrRemoveFavourite);
router
  .route('/:song_id')
  .get(songController.getSongDetail)
  .put(songController.editSong)
  .delete(songController.deleteSong);

export default router;
