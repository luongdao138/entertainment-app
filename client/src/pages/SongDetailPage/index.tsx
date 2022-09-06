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
import { useAudioContext } from '../../context/AudioContext';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';

const SongDetailPage = () => {
  const { authUser } = useAuthContext();
  // const isFirstRenderRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const { song_id } = useParams();
  const navigate = useNavigate();
  const { handleClickSongAudio } = useAudioContext();
  // const isFirstRenderRef = useRef<boolean>(true);

  const song_detail = useAppSelector(getSongDetailSelector);
  const recommended_songs = useAppSelector(getRecommendedSongsSelector);
  const feature_playlists = useAppSelector(getFeaturePlaylists);

  const onClickSongAudio = (song: AudioSong) => {
    handleClickSongAudio({
      song,
      list_songs: recommended_songs,
      playlist: null,
      is_from_recommend: true,
    });
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
        {song_detail && (
          <SongDetailInfor
            recommended_songs={recommended_songs}
            song={song_detail}
          />
        )}
        <div className='song-list'>
          {song_detail && (
            <SongList
              onClickSongAudio={onClickSongAudio}
              songs={[song_detail]}
            />
          )}

          {recommended_songs.length > 0 && (
            <div className='recommend-songs'>
              <h2 className='title'>Có thể bạn quan tâm</h2>
              <SongList
                songs={recommended_songs}
                onClickSongAudio={onClickSongAudio}
              />
            </div>
          )}
        </div>
      </div>

      {song_detail?.user_id !== authUser?.id && (
        <div className='group'>
          <h2 className='title'>Nhạc Của {song_detail?.user.full_name}</h2>
          <div className='group-list'>
            {feature_playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default SongDetailPage;
