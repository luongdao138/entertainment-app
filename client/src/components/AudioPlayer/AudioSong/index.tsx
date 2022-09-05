import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Song } from '../../../services/song';
import LoginRequired from '../../LoginRequired';
import SongItemMenu from '../../SongItemMenu';
import { Container } from './style';

interface Props {
  song: Song;
}

const AudioSong: React.FC<Props> = ({ song }) => {
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLikeSong = () => {};

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
      <Container>
        <div className='song-thumbnail'>
          <img src={song.thumbnail} alt='' />
        </div>
        <div className='song-info'>
          <Link to='/' className='song-name'>
            {song.name}
          </Link>
          <Link className='singer-name' to='/'>
            {song.singer_name}
          </Link>
        </div>

        <div className='song-actions'>
          <LoginRequired>
            <button onClick={handleClickLikeSong} className='action like-btn'>
              {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </LoginRequired>

          <button
            className='action more-action'
            aria-label='more'
            id='song-item-button'
            aria-controls={openSongMenu ? 'song-item-menu' : undefined}
            aria-expanded={openSongMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleOpenSongMenu}
          >
            <MdMoreHoriz />
          </button>
        </div>
      </Container>
    </>
  );
};

export default AudioSong;
