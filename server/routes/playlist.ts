import { Router } from 'express';
import playlistController from '../controllers/playlist';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();
router.use(verifyTokenMiddleware);

router.post('/', playlistController.createNewPlaylist);
router.get('/private', playlistController.getUserPrivatePlaylist);
router
  .route('/:play_list_id')
  .put(playlistController.editPlaylist)
  .delete(playlistController.deletePlaylist);

export default router;
