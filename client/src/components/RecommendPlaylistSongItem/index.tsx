import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Song } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';

interface Props {
  song: Song;
}

const RecommendPlaylistSongItem: React.FC<Props> = ({ song }) => {
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);

  const handleClickFavourite = async () => {};

  useEffect(() => {
    setIsLiked(song.is_liked);
  }, [song.is_liked]);

  return (
    <Container is_liked={is_liked}>
      <div className='song-left'>
        <div className='music-icon'>
          <FiMusic />
        </div>

        <div className='song-thumbnail'>
          <img src={song.thumbnail} alt='' />
          <div className='opacity'></div>
          <BsFillPlayFill className='play-state' />
        </div>
        <div className='song-info'>
          <h4 className='name'>{song.name}</h4>
          <p className='singer'>{song.singer_name}</p>
        </div>
      </div>
      <div className='song-right'>
        <button className='favorite' onClick={handleClickFavourite}>
          {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <span className='duration'>{formatSongDuration(song.duration)}</span>
        <div className='song-menu-wrapper'>
          <button className='more-action'>
            <MdAdd />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default RecommendPlaylistSongItem;
