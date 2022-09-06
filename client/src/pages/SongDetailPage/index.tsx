import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import PlaylistItem from '../../components/PlaylistItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import SongDetailInfor from '../../components/SongDetailInfor';
import SongList from '../../components/SongList';
import { useEffect } from 'react';
import { getSongDetailAction } from '../../redux/songDetail/songDetailActions';
import appRoutes from '../../constants/appRoutes';
import {
  getRecommendedSongsSelector,
  getSongDetailSelector,
  getFeaturePlaylists,
} from '../../redux/songDetail/songDetailSelector';
import { changePlaylistFavourite, Playlist } from '../../services/playlist';
import { toast } from 'react-toastify';
import { logout } from '../../redux/auth/authSlice';
import { changeFavouritePlaylistSuccess } from '../../redux/songDetail/songDetailSlice';

const SongDetailPage = () => {
  const { authUser } = useAuthContext();
  // const isFirstRenderRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const { song_id } = useParams();
  const navigate = useNavigate();
  // const isFirstRenderRef = useRef<boolean>(true);

  const song_detail = useAppSelector(getSongDetailSelector);
  const recommended_songs = useAppSelector(getRecommendedSongsSelector);
  const feature_playlists = useAppSelector(getFeaturePlaylists);

  const handleChangeFavoritePlaylist = async (playlist: Playlist) => {
    try {
      await changePlaylistFavourite({ id: playlist.id });

      if (playlist.is_liked) {
        toast.success('Đã xóa playlist khỏi thư viện ');
      } else {
        toast.success('Đã thêm bài hát vào thư viện');
      }
      dispatch(changeFavouritePlaylistSuccess(playlist.id));
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    // lấy thông tin chi tiết của bài hát
    if (song_id) {
      dispatch(getSongDetailAction({ song_id }))
        .unwrap()
        .catch((errorCode: any) => {
          if (errorCode === 404) {
            navigate(appRoutes.HOME, { replace: true });
          }
        });
    }
  }, [song_id, authUser]);

  return (
    <Container>
      <div className='detail-top'>
        {song_detail && <SongDetailInfor song={song_detail} />}
        <div className='song-list'>
          {song_detail && <SongList songs={[song_detail]} />}

          {recommended_songs.length > 0 && (
            <div className='recommend-songs'>
              <h2 className='title'>Có thể bạn quan tâm</h2>
              <SongList songs={recommended_songs} />
            </div>
          )}
        </div>
      </div>

      {song_detail?.user_id !== authUser?.id && (
        <div className='group'>
          <h2 className='title'>Nhạc Của {song_detail?.user.full_name}</h2>
          <div className='group-list'>
            {feature_playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                onClickLikePlaylist={() =>
                  handleChangeFavoritePlaylist(playlist)
                }
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default SongDetailPage;
