import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { Song } from '../../../../services/song';
import SongItemMenu from '../../../SongItemMenu';
import { Container } from './style';

interface Props {
  song: Song;
}

const QueueSongItem: React.FC<Props> = ({ song }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id='song-item-menu'
        MenuListProps={{
          'aria-labelledby': 'song-item-button',
        }}
        anchorEl={anchorEl}
        open={openSongMenu}
        onClose={handleCloseSongMenu}
        sx={{
          '& .MuiList-root': {
            padding: 0,
          },
        }}
        PaperProps={{
          sx: {
            padding: 0,
            background: 'none',
            boxShadow: 'none',
          },
        }}
      >
        <SongItemMenu song={song} closeSongItemAction={handleCloseSongMenu} />
      </Menu>
      <Container is_liked={is_liked}>
        <div className='song-left'>
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
          <button className='favourite action'>
            {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button
            aria-label='more'
            id='song-item-button'
            aria-controls={openSongMenu ? 'song-item-menu' : undefined}
            aria-expanded={openSongMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleOpenSongMenu}
            className='more-btn action'
          >
            <MdMoreHoriz />
          </button>
        </div>
      </Container>
    </>
  );
};

export default QueueSongItem;
