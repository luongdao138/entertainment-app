import React from 'react';
import { Container } from './style';
import { AiOutlineReload } from 'react-icons/ai';
import { Song } from '../../services/song';
import RecommendPlaylistSongItem from '../RecommendPlaylistSongItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPlaylistRecommendedSongsSelector,
  getPlaylistRecommendedTitleSelector,
} from '../../redux/playlistDetail/playlistDetailSelector';
import { shuffleRecommendedSongs } from '../../redux/playlistDetail/playlistDetailSlice';
import _ from 'lodash';

interface Props {
  playlist_id: string;
}

const PlaylistRecommendSongs: React.FC<Props> = ({ playlist_id }) => {
  const title = useAppSelector(getPlaylistRecommendedTitleSelector);
  const songs = useAppSelector(getPlaylistRecommendedSongsSelector);
  const dispatch = useAppDispatch();

  const handleShuffleSongs = () => {
    let new_songs = _.shuffle(songs);
    dispatch(shuffleRecommendedSongs({ songs: new_songs }));
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
            <AiOutlineReload />
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
          />
        ))}
      </div>
    </Container>
  );
};

export default PlaylistRecommendSongs;
