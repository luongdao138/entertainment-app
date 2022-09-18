import historyController from '../controllers/history';
import { Router } from 'express';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();
router.use(verifyTokenMiddleware);

router
  .route('/song')
  .post(historyController.addSongToRecentList)
  .get(historyController.getHistorySongs);
router.route('/song/:song_id').delete(historyController.deleteSongOutOfHistory);

export default router;
