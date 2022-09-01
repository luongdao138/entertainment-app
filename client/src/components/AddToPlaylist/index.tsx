import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Container, PlaylistContainer } from './style';
import { RiAddBoxFill } from 'react-icons/ri';
import { ReactComponent as NoPlaylistIcon } from '../../assets/no_playlist.svg';
import { MdPlaylistAdd } from 'react-icons/md';

const AddToPlaylist = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Menu
        id='add-playlist-menu'
        MenuListProps={{
          'aria-labelledby': 'add-playlist-button',
        }}
        disablePortal
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            padding: 0,
          },
          '& .MuiPaper-root': {
            transform: 'translateY(6px) !important',
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
        <PlaylistContainer>
          <div className='search-playlist-container'>
            <input type='text' placeholder='Tìm playlist' />
          </div>

          <button className='add-playlist-item new-playlist'>
            <RiAddBoxFill />
            <span> Tạo playlist mới</span>
          </button>

          <div>
            <button className='add-playlist-item'>
              <MdPlaylistAdd />
              <span>Playlist 1</span>
            </button>
            <button className='add-playlist-item'>
              <MdPlaylistAdd />
              <span>Playlist 2</span>
            </button>
            <button className='add-playlist-item'>
              <MdPlaylistAdd />
              <span>Playlist 3</span>
            </button>
            <button className='add-playlist-item'>
              <MdPlaylistAdd />
              <span>Playlist 4</span>
            </button>
          </div>
          {/* <div className='no-playlists'>
            <NoPlaylistIcon className='icon' />
            <span>Không có playlist</span>
          </div> */}
        </PlaylistContainer>
      </Menu>
      <div
        className='add-main'
        aria-label='add-playlist'
        id='add-playlist-button'
        aria-controls={openMenu ? 'add-playlist-menu' : undefined}
        aria-expanded={openMenu ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <IoMdAddCircleOutline />
        <span>Thêm vào playlist</span>
      </div>
    </Container>
  );
};

export default AddToPlaylist;
