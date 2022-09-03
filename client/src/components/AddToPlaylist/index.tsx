import { Menu } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Container, PlaylistContainer } from './style';
import { RiAddBoxFill } from 'react-icons/ri';
import { ReactComponent as NoPlaylistIcon } from '../../assets/no_playlist.svg';
import { MdPlaylistAdd } from 'react-icons/md';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPrivatePlaylists } from '../../redux/playlist/playlistActions';
import { getPrivatePlaylist } from '../../redux/playlist/playlistSelector';

interface Props {
  onAddToPlaylist: (playlist_id: string) => void;
}

const AddToPlaylist: React.FC<Props> = ({ onAddToPlaylist }) => {
  const { openUploadPlaylistForm } = useUploadPlaylistContext();
  const [title, setTitle] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const private_playlists = useAppSelector(getPrivatePlaylist);

  const rendered_playlists = useMemo(
    () =>
      private_playlists.filter(
        (playlist) =>
          playlist.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
      ),
    [title, private_playlists]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (openMenu) {
      dispatch(getPrivatePlaylists({ is_own: true }));
    }
  }, [openMenu]);

  return (
    <Container>
      <Menu
        id='add-playlist-menu'
        MenuListProps={{
          'aria-labelledby': 'add-playlist-button',
        }}
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
            <input
              value={title}
              onChange={handleChangeSearch}
              type='text'
              placeholder='Tìm playlist'
            />
          </div>

          <button
            className='add-playlist-item new-playlist'
            onClick={openUploadPlaylistForm}
          >
            <RiAddBoxFill />
            <span> Tạo playlist mới</span>
          </button>

          {rendered_playlists.length > 0 ? (
            <div className='list-playlists'>
              {rendered_playlists.map((playlist) => (
                <button
                  className='add-playlist-item'
                  key={playlist.id}
                  onClick={() => {
                    onAddToPlaylist(playlist.id);
                    handleClose();
                  }}
                >
                  <MdPlaylistAdd />
                  <span>{playlist.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className='no-playlists'>
              <NoPlaylistIcon className='icon' />
              <span>Không có playlist</span>
            </div>
          )}
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
