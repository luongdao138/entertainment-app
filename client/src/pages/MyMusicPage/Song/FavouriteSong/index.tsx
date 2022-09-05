import React, { useEffect, useRef } from 'react';
import SongList from '../../../../components/SongList';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getFavouriteSong } from '../../../../redux/song/songActions';
import { getUsersFavouriteSongs } from '../../../../redux/song/songSelectors';
import { NoSongsContainer } from './style';
import emptyFavouriteIcon from '../../../../assets/empty-favourite.png';
import { Link } from 'react-router-dom';
import { Song, SongDetail } from '../../../../services/song';
import {
  getAudioCurrentSongSelector,
  getAudioStateSelector,
} from '../../../../redux/audioPlayer/audioPlayerSelectors';
import {
  changeAudioArchivedList,
  changeAudioCurrentSong,
  changeAudioListSongs,
  changeAudioNextList,
} from '../../../../redux/audioPlayer/audioPlayerSlice';
import _ from 'lodash';
import { useAudioContext } from '../../../../context/AudioContext';

const FavouriteSong = () => {
  const dispatch = useAppDispatch();
  // const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersFavouriteSongs);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const audio_state = useAppSelector(getAudioStateSelector);

  const { handleClickSongAudio } = useAudioContext();

  useEffect(() => {
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //   return;
    // }

    dispatch(getFavouriteSong());
  }, []);

  const handleClickFavouriteSongAudio = (song: Song | SongDetail) => {
    handleClickSongAudio({
      song,
      playlist: null,
      list_songs: songs,
    });
  };

  return songs.length === 0 ? (
    <NoSongsContainer>
      <img src={emptyFavouriteIcon} alt='' />
      <h3>Chưa có bài hát yêu thích trong thư viện cá nhân</h3>
      <Link to='/'>Khám phá ngay</Link>
    </NoSongsContainer>
  ) : (
    <SongList
      onClickSongAudio={handleClickFavouriteSongAudio}
      songs={songs}
      enable_select_multiple
      can_change_favourite_songs
    />
  );
};

export default FavouriteSong;
