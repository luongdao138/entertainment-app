import React from 'react';
import { Container } from './style';
import { AiOutlineReload } from 'react-icons/ai';
import { Song } from '../../services/song';
import RecommendPlaylistSongItem from '../RecommendPlaylistSongItem';

interface Props {
  songs: Song[];
}

const PlaylistRecommendSongs: React.FC<Props> = ({ songs }) => {
  return (
    <Container>
      <div className='recommend-header'>
        <div className='recommend-header-left'>
          <h2 className='title'>Bài hát gợi ý</h2>
          <p className='desc'>Dựa trên các bài hát của playlist này</p>
        </div>
        <div className='recommend-header-right'>
          <button>
            <AiOutlineReload />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      <div className='recommend-songs'>
        {songs.map((song) => (
          <RecommendPlaylistSongItem key={song.id} song={song} />
        ))}
      </div>
    </Container>
  );
};

export default PlaylistRecommendSongs;
