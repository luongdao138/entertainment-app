import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { v4 as uuid } from 'uuid';
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
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import PlaylistDetailInfor from '../../components/PlaylistDetailInfor';
import SongList from '../../components/SongList';
import appRoutes from '../../constants/appRoutes';
import { calcTotalPlaylistTime } from '../../utils/formatTime';
import { useAudioContext } from '../../context/AudioContext';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import {
  getAudioCurrentListSongs,
  getAudioCurrentPlaylistSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import _ from 'lodash';
import { clearData } from '../../redux/playlistDetail/playlistDetailSlice';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { clearMetaData } from '../../redux/metadata/actions';
import Helmet from 'react-helmet';

const PlaylistDetailPage = () => {
  const { authUser } = useAuthContext();
  // const isFirstRenderRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const { playlist_id } = useParams();
  const navigate = useNavigate();
  const location: any = useLocation();
  const [searchParams] = useSearchParams();

  const target_song_id = searchParams.get('song_id');

  const playlist_detail = useAppSelector(getPlaylistDetailSelector);
  const playlist_songs = useAppSelector(getPlaylistSongsSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);

  const is_own_playlist = authUser?.id === playlist_detail?.creator.id;
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);

  const getPlaylistDetailMeta = useAppSelector(
    createMetaSelector(getPlaylistDetailAction)
  );
  const getPlaylistSongsMeta = useAppSelector(
    createMetaSelector(getPlaylistSongsAction)
  );

  const is_full_load =
    getPlaylistDetailMeta.loaded && getPlaylistSongsMeta.loaded;

  const is_current_audio = playlist_detail?.id === current_playlist?.id;
  const is_current_queue_song =
    audio_list_songs.find((s) => s.is_current_audio)?.queue_playlist_id ===
    playlist_detail?.id;

  const { handleClickSongAudio } = useAudioContext();

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    // l???y th??ng tin chi ti???t c???a playlist
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
      // l???y ra t???t c??? c??c b??i h??t c???a playlist ????
      dispatch(getPlaylistSongsAction({ playlist_id }));

      // l???y ra nh???ng b??i h??t ??c recommend cho playlist n??y (ch??? khi playlist n??y c???a ch??nh authUser)
      if (is_own_playlist)
        dispatch(getRecommendedSongsActions({ playlist_id }));
    }
  }, [playlist_id, authUser, is_own_playlist]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, []);

  useEffect(() => {
    if (
      location.state?.play_audio &&
      playlist_detail &&
      playlist_songs.length > 0 &&
      is_full_load
    ) {
      if (playlist_songs.length === 0) return;
      const shuffled_playlist_songs = _.shuffle(playlist_songs);
      handleClickSongAudio({
        playlist: playlist_detail,
        list_songs: playlist_songs,
        song: !playlist_detail.is_owner
          ? playlist_songs[0]
          : playlist_detail.play_random
          ? shuffled_playlist_songs[0]
          : playlist_songs[0],
        force_replace: true,
        playlist_play_random: playlist_detail?.is_owner
          ? playlist_detail.play_random
          : undefined,
      });
    }

    return () => {
      window.history.replaceState({}, document.title);
      dispatch(clearMetaData(getPlaylistDetailAction.typePrefix));
      dispatch(clearMetaData(getPlaylistSongsAction.typePrefix));
    };
  }, [location.state, is_full_load]);

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
      <Helmet>
        <title>{playlist_detail.title} | Playlist</title>
      </Helmet>
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
              <p>Kh??ng c?? b??i h??t n??o trong playlist c???a b???n</p>
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
                scrollToCurrentSong={is_current_queue_song}
                target_song_id={target_song_id}
              />

              <div className='song-count'>
                <p className='count'>{playlist_songs.length} b??i h??t</p>
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
        <h2 className='title'>Ngh??? s?? tham gia</h2>
        <div className='group-list'>
          {[...new Array(4)].map((_, index) => (
            <ArtistItem key={index} />
          ))}
        </div>
      </div>

      <div className='group'>
        <h2 className='title'>C?? th??? b???n quan t??m</h2>
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
                title: 'Nh???c hoa th???nh h??nh',
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
