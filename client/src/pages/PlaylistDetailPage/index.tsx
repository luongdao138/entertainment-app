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
  getRecommendedSongsActions,
  removeSongOutOfPlaylistAction,
} from '../../redux/playlistDetail/playlistDetailActions';
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistDetailInfor from '../../components/PlaylistDetailInfor';
import SongList from '../../components/SongList';
import appRoutes from '../../constants/appRoutes';
import { calcTotalPlaylistTime } from '../../utils/formatTime';
import useReloadWhenLogout from '../../hooks/useReloadWhenLogout';
import { useAudioContext } from '../../context/AudioContext';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';

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
  belong_categories: [],
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

  const is_own_playlist = authUser?.id === playlist_detail?.creator.id;
  const { handleClickSongAudio } = useAudioContext();

  useReloadWhenLogout();

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    // lấy thông tin chi tiết của playlist
    if (playlist_id) {
      dispatch(getPlaylistDetailAction({ playlist_id }))
        .unwrap()
        .catch((errorCode: any) => {
          if (errorCode === 404) {
            navigate(appRoutes.HOME, { replace: true });
          }
        });
    }

    // get playlist detail data
    if (playlist_id && authUser) {
      // lấy ra tất cả các bài hát của playlist đó
      dispatch(getPlaylistSongsAction({ playlist_id }));

      // lấy ra những bài hát đc recommend cho playlist này (chỉ khi playlist này của chính authUser)
      if (is_own_playlist)
        dispatch(getRecommendedSongsActions({ playlist_id }));
    }
  }, [playlist_id, authUser, is_own_playlist]);

  if (!playlist_detail) return null;

  const handleRemoveSongOutOfPlaylist = (song_id: string) => {
    dispatch(
      removeSongOutOfPlaylistAction({
        playlist_id: playlist_detail.id,
        song_id,
      })
    );
  };

  const onClickSongAudio = (song: AudioSong) => {
    handleClickSongAudio({
      playlist: playlist_detail,
      list_songs: playlist_songs,
      song,
    });
  };

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
                can_remove_out_of_list={playlist_detail.is_owner}
                handleRemoveSongOutOfPlaylist={handleRemoveSongOutOfPlaylist}
                enable_select_multiple
                onClickSongAudio={onClickSongAudio}
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

          {is_own_playlist && (
            <div className='playlist-songs-recommend'>
              {playlist_id && (
                <PlaylistRecommendSongs playlist_id={playlist_id} />
              )}
            </div>
          )}
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
