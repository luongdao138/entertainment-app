import React, { startTransition, useEffect, useState } from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { Container } from './style';
import { Link } from 'react-router-dom';
import { Playlist } from '../../services/playlist';
import { Menu } from '@mui/material';
import PlaylistItemMenu from '../PlaylistItemMenu';
import ConfirmDialog from '../ConfirmDialog';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import appRoutes from '../../constants/appRoutes';
import {
  deletePlaylist,
  getPrivatePlaylists,
} from '../../redux/playlist/playlistActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { clearMetaData } from '../../redux/metadata/actions';

interface Props {
  playlist: Playlist;
}

const deletePlaylistMetaSelector = createMetaSelector(deletePlaylist);

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  const { changeToEditMode, setEditedPlaylist, openUploadPlaylistForm } =
    useUploadPlaylistContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const deletePlaylistMeta = useAppSelector(deletePlaylistMetaSelector);

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteConfirmModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
  };

  const handleDeletePlaylist = async () => {
    dispatch(
      deletePlaylist({
        data: { id: playlist.id },
        onSuccess: () => {
          handleCloseDeleteConfirmModal();
          dispatch(getPrivatePlaylists({ limit: 5, page: 1 }));
        },
      })
    );
  };

  const handleOpenEditPlaylistForm = () => {
    startTransition(() => {
      changeToEditMode();
      setEditedPlaylist(playlist);
    });

    openUploadPlaylistForm();
  };

  useEffect(() => {
    clearMetaData(deletePlaylist.typePrefix);
  }, []);

  return (
    <Container>
      <Menu
        id='playlist-item-menu'
        MenuListProps={{
          'aria-labelledby': 'playlist-item-button',
        }}
        disablePortal
        anchorEl={anchorEl}
        open={openPlaylistMenu}
        onClose={handleClose}
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
        <PlaylistItemMenu
          playlist_id={playlist.id}
          can_delete={playlist.can_delete}
          can_edit={playlist.can_edit}
          onOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
          onOpenEditForm={handleOpenEditPlaylistForm}
        />
      </Menu>

      {playlist.can_delete && (
        <ConfirmDialog
          desc='Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?'
          title='Xóa Playlist'
          open={openDeleteConfirmModal}
          onCancel={handleCloseDeleteConfirmModal}
          onOk={handleDeletePlaylist}
          meta={deletePlaylistMeta}
        />
      )}

      <Link
        to={appRoutes.PLAYLIST_DETAIL.replace(':playlist_id', playlist.id)}
        className='thumbnail-container'
      >
        <img src={playlist.thumbnail} alt='' />

        <div className='thumbnail-backdrop'></div>

        <div className='thumbnail-actions'>
          <button className='action' onClick={handleOpenDeleteConfirmModal}>
            <MdClose />
          </button>
          <button className='play-state'>
            <BsFillPlayFill />
          </button>

          <div>
            <button
              className='action'
              aria-label='more'
              id='playlist-item-button'
              aria-controls={
                openPlaylistMenu ? 'playlist-item-menu' : undefined
              }
              aria-expanded={openPlaylistMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClickMore}
            >
              <MdMoreHoriz />
            </button>
          </div>
        </div>
      </Link>

      <Link to='/' className='name'>
        {playlist.title}
      </Link>
      <p className='author'>{playlist.creator.full_name}</p>
    </Container>
  );
};

export default PlaylistItem;
