import { Router } from 'express';
import playlistController from '../controllers/playlist';
import verifyTokenMiddleware from '../middlewares/verifyJwt';
import verifyNoTokenMiddleware from '../middlewares/verifyJwtNoToken';

const router = Router();
router.post('/', verifyTokenMiddleware, playlistController.createNewPlaylist);
router.get(
  '/private',
  verifyTokenMiddleware,
  playlistController.getUserPrivatePlaylist
);
router.get(
  '/recommend/:playlist_id',
  verifyTokenMiddleware,
  playlistController.getRecommendedSongsOfPlaylist
);
router.put(
  '/changeSongPosition',
  verifyTokenMiddleware,
  playlistController.changeSongPositionInPlaylist
);
router.post(
  '/addSong',
  verifyTokenMiddleware,
  playlistController.addSongToPlaylist
);
router.post(
  '/removeSong',
  verifyTokenMiddleware,
  playlistController.deleteSongOutOfPlaylist
);
router.get(
  '/getSong/:playlist_id',
  verifyNoTokenMiddleware,
  playlistController.getAllSongsOfPlaylist
);
router.put(
  '/favourite/:playlist_id',
  verifyTokenMiddleware,
  playlistController.likeOrUnlikePlaylist
);
router
  .route('/:play_list_id')
  .get(verifyNoTokenMiddleware, playlistController.getPlaylistDetail)
  .put(verifyTokenMiddleware, playlistController.editPlaylist)
  .delete(verifyTokenMiddleware, playlistController.deletePlaylist);

export default router;
