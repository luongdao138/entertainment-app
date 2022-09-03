import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { v4 as uuid } from 'uuid';
import { Song } from '../../services/song';
import PlaylistRecommendSongs from '../../components/PlaylistRecommendSongs';
import ArtistItem from '../../components/ArtistItem';
import PlaylistItem from '../../components/PlaylistItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPlaylistDetailSelector,
  getPlaylistSongsSelector,
} from '../../redux/playlistDetail/playlistDetailSelector';
import {
  getPlaylistDetailAction,
  getPlaylistSongsAction,
} from '../../redux/playlistDetail/playlistDetailActions';
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistDetailInfor from '../../components/PlaylistDetailInfor';
import SongList from '../../components/SongList';
import appRoutes from '../../constants/appRoutes';
import { calcTotalPlaylistTime } from '../../utils/formatTime';

const mockSongs: Song[] = [...new Array(6)].fill({}).map(() => ({
  id: uuid(),
  created_at: new Date(),
  duration: 170,
  is_liked: false,
  name: 'Ngân hà và vì sao',
  singer_name: 'Tiểu lam bối tâm',
  thumbnail:
    'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
  updated_at: new Date(),
  url: '',
}));

const PlaylistDetailPage = () => {
  const { authUser } = useAuthContext();
  // const isFirstRenderRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const { playlist_id } = useParams();
  const navigate = useNavigate();
  const [is_current_audio, setIsCurrentAudio] = useState<boolean>(false);

  const playlist_detail = useAppSelector(getPlaylistDetailSelector);
  const playlist_songs = useAppSelector(getPlaylistSongsSelector);

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    // get playlist detail data
    if (playlist_id && authUser) {
      // lấy thông tin chi tiết của playlist
      dispatch(getPlaylistDetailAction({ playlist_id }))
        .unwrap()
        .catch((errorCode: any) => {
          if (errorCode === 404) {
            navigate(appRoutes.HOME, { replace: true });
          }
        });

      // lấy ra tất cả các bài hát của playlist đó
      dispatch(getPlaylistSongsAction({ playlist_id }));
    }
  }, [playlist_id, authUser]);

  if (!playlist_detail) return null;

  return (
    <Container>
      <div className='detail-top'>
        <PlaylistDetailInfor
          playlist_detail={playlist_detail}
          is_current_audio={is_current_audio}
          songs={playlist_songs}
        />
        <div className='playlist-songs'>
          {playlist_songs.length === 0 ? (
            <div className='no-songs'>
              <HiOutlineMusicNote />
              <p>Không có bài hát nào trong playlist của bạn</p>
            </div>
          ) : (
            <div className='playlist-songs-main'>
              <SongList
                can_drag={playlist_detail.is_owner}
                songs={playlist_songs}
                playlist_id={playlist_detail.id}
              />

              <div className='song-count'>
                <p className='count'>{playlist_songs.length} bài hát</p>
                <p className='time'>
                  {calcTotalPlaylistTime(
                    playlist_songs.map((ps) => ps.duration)
                  )}
                </p>
              </div>
            </div>
          )}

          <div className='playlist-songs-recommend'>
            <PlaylistRecommendSongs songs={mockSongs} />
          </div>
        </div>
      </div>

      <div className='involved-artists group'>
        <h2 className='title'>Nghệ sĩ tham gia</h2>
        <div className='group-list'>
          {[...new Array(4)].map((_, index) => (
            <ArtistItem key={index} />
          ))}
        </div>
      </div>

      <div className='group'>
        <h2 className='title'>Có thể bạn quan tâm</h2>
        <div className='group-list'>
          {[...new Array(4)].map((_, index) => (
            <PlaylistItem
              key={index}
              playlist={{
                can_delete: false,
                can_edit: false,
                id: uuid(),
                created_at: new Date(),
                creator: {
                  full_name: 'Dao Van Luong',
                  id: '1',
                },
                is_owner: false,
                play_random: true,
                privacy: 'private',
                public_at: new Date(),
                thumbnail:
                  'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/4/f/f/74ffe8e0389cd62ac5a8c82297260373.jpg',
                title: 'Nhạc hoa thịnh hành',
                updated_at: new Date(),
                is_liked: false,
                has_songs: [],
              }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PlaylistDetailPage;
