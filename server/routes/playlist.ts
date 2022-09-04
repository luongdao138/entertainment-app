import { Router } from 'express';
import playlistController from '../controllers/playlist';
import verifyTokenMiddleware from '../middlewares/verifyJwt';

const router = Router();
router.use(verifyTokenMiddleware);

router.post('/', playlistController.createNewPlaylist);
router.get('/private', playlistController.getUserPrivatePlaylist);
router.get(
  '/recommend/:playlist_id',
  playlistController.getRecommendedSongsOfPlaylist
);
router.put(
  '/changeSongPosition',
  playlistController.changeSongPositionInPlaylist
);
router.post('/addSong', playlistController.addSongToPlaylist);
router.post('/removeSong', playlistController.deleteSongOutOfPlaylist);
router.get('/getSong/:playlist_id', playlistController.getAllSongsOfPlaylist);
router
  .route('/:play_list_id')
  .get(playlistController.getPlaylistDetail)
  .put(playlistController.editPlaylist)
  .delete(playlistController.deletePlaylist);

router.put('/favourite/:playlist_id', playlistController.likeOrUnlikePlaylist);

export default router;
