import React from 'react';
import { Container } from './style';
import RecommendPlaylistSongItem from '../RecommendPlaylistSongItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPlaylistRecommendedSongsSelector,
  getPlaylistRecommendedTitleSelector,
} from '../../redux/playlistDetail/playlistDetailSelector';
import { shuffleRecommendedSongs } from '../../redux/playlistDetail/playlistDetailSlice';
import _ from 'lodash';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import { useAudioContext } from '../../context/AudioContext';
import { getAudioCurrentSongSelector } from '../../redux/audioPlayer/audioPlayerSelectors';
import { HiOutlineRefresh } from 'react-icons/hi';
interface Props {
  playlist_id: string;
}

const PlaylistRecommendSongs: React.FC<Props> = ({ playlist_id }) => {
  const title = useAppSelector(getPlaylistRecommendedTitleSelector);
  const songs = useAppSelector(getPlaylistRecommendedSongsSelector);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const dispatch = useAppDispatch();
  const { handleClickSongAudio } = useAudioContext();

  const handleShuffleSongs = () => {
    let new_songs = _.shuffle(songs);
    dispatch(shuffleRecommendedSongs({ songs: new_songs }));
  };

  const onClickSongAudio = (song: AudioSong) => {
    handleClickSongAudio({
      song,
      list_songs: songs,
      playlist: null,
      is_from_recommend: true,
    });
  };

  return (
    <Container>
      <div className='recommend-header'>
        <div className='recommend-header-left'>
          <h2 className='title'>Bài hát gợi ý</h2>
          <p className='desc'>{title}</p>
        </div>
        <div className='recommend-header-right'>
          <button onClick={handleShuffleSongs}>
            <HiOutlineRefresh />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      <div className='recommend-songs'>
        {songs.slice(0, 20).map((song) => (
          <RecommendPlaylistSongItem
            playlist_id={playlist_id}
            key={song.id}
            song={song}
            onClickSongAudio={onClickSongAudio}
          />
        ))}
      </div>
    </Container>
  );
};

export default PlaylistRecommendSongs;
