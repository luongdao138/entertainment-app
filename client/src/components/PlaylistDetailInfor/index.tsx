import { Menu } from '@mui/material';
import React, { startTransition, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineModeEdit, MdPause, MdMoreHoriz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import appRoutes from '../../constants/appRoutes';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../constants/images';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { likePlaylist } from '../../redux/playlistDetail/playlistDetailSlice';
import {
  changePlaylistFavourite,
  deletePlaylist,
  PlaylistDetail,
} from '../../services/playlist';
import { Song } from '../../services/song';
import AudioLoadingIcon from '../AudioPlayingIcon';
import ConfirmDialog from '../ConfirmDialog';
import PlaylistItemMenu from '../PlaylistItemMenu';
import { Container } from './style';

interface Props {
  is_liked?: boolean;
  is_current_audio?: boolean;
  playlist_detail: PlaylistDetail;
  songs: Song[];
}

const PlaylistDetailInfor: React.FC<Props> = ({
  is_current_audio,
  playlist_detail,
  songs,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { changeToEditMode, setEditedPlaylist, openUploadPlaylistForm } =
    useUploadPlaylistContext();
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    useState<boolean>(false);
  const [is_changed, setIsChanged] = useState<boolean>(false);
  const [is_playing, setIsPlaying] = useState<boolean>(false);
  const [is_liked, setIsLiked] = useState<boolean>(false);

  const handleChangePlayState = () => {
    setIsChanged(true);
    setIsPlaying((prev) => !prev);
  };

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleOpenDeleteConfirmModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditPlaylistForm = () => {
    startTransition(() => {
      changeToEditMode();
      setEditedPlaylist(playlist_detail);
    });

    openUploadPlaylistForm();
  };

  const handleDeletePlaylist = async () => {
    if (playlist_detail) {
      try {
        await deletePlaylist({ id: playlist_detail.id });
        navigate(appRoutes.LIBRARY_PLAYLIST);
      } catch (error: any) {
        toast.success(error.response?.data.msg || 'Có lỗi xảy ra');
        if (error.response?.status === 403) {
          localStorage.removeItem('music_token');
          dispatch(logout());
        }
      }
    }
  };

  const toggleLikePlaylist = async () => {
    try {
      const prev = is_liked;
      startTransition(() => {
        setIsLiked((prev) => !prev);
      });

      await changePlaylistFavourite({ id: playlist_detail.id });
      if (prev) {
        toast.success('Đã xóa playlist khỏi thư viện');
      } else {
        toast.success('Đã thêm playlist vào thư viện');
      }

      dispatch(likePlaylist());
    } catch (error: any) {
      toast.error(error.response?.data.msg);
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    if (playlist_detail) {
      setIsLiked(Boolean(playlist_detail.is_liked));
    }
  }, [playlist_detail]);

  return (
    <Container
      is_changed={is_changed}
      is_playing={is_playing}
      is_current_audio={is_current_audio}
      is_liked={is_liked}
      is_multiple={songs.length >= 4}
    >
      {playlist_detail.can_delete && (
        <ConfirmDialog
          desc='Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?'
          title='Xóa Playlist'
          open={openDeleteConfirmModal}
          onCancel={handleCloseDeleteConfirmModal}
          onOk={handleDeletePlaylist}
        />
      )}
      <Menu
        id='playlist-item-menu'
        MenuListProps={{
          'aria-labelledby': 'playlist-item-button',
        }}
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
          playlist_id={playlist_detail.id}
          can_delete={playlist_detail.can_delete}
          can_edit={playlist_detail.can_edit}
          onOpenEditForm={handleOpenEditPlaylistForm}
          onOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
          closePlaylistItemMenu={handleClose}
        />
      </Menu>
      <div
        className='playlist-thumbnail-container'
        onClick={handleChangePlayState}
      >
        <div className='thumbnail-icon'>
          <button className='play-state'>
            {is_playing ? <AudioLoadingIcon /> : <BsFillPlayFill />}
          </button>
        </div>
        {songs.length >= 4 ? (
          <div className='playlist-thumbnail multiple'>
            <div className='imgs'>
              <img src={songs[0].thumbnail} alt='' />
              <img src={songs[1].thumbnail} alt='' />
              <img src={songs[2].thumbnail} alt='' />
              <img src={songs[3].thumbnail} alt='' />
            </div>
            <div className='thumbnail-backdrop'></div>
          </div>
        ) : (
          <div className='playlist-thumbnail'>
            <img
              src={
                songs.length === 0
                  ? DEFAULT_PLAYLIST_THUMBNAIL
                  : songs[0].thumbnail
              }
              alt=''
            />
            <div className='thumbnail-backdrop'></div>
          </div>
        )}
      </div>

      <div className='playlist-info-content'>
        <div className='playlist-name'>
          <h2>{playlist_detail?.title}</h2>
          {playlist_detail.can_edit && (
            <button onClick={handleOpenEditPlaylistForm}>
              <MdOutlineModeEdit />
            </button>
          )}
        </div>

        <p className='creator'>
          Tạo bởi <span>{playlist_detail?.creator.full_name}</span>
        </p>

        <p className='privacy'>
          {playlist_detail?.privacy === 'private' ? 'Riêng tư' : 'Công khai'}
        </p>
        <p className='like-count'>188k người yêu thích</p>

        <button className='play-btn'>
          {is_playing ? <MdPause /> : <BsFillPlayFill />}
          <span>
            {is_current_audio
              ? is_playing
                ? 'Tạm dừng'
                : 'Tiếp tục phát'
              : 'Phát ngẫu nhiên'}
          </span>
        </button>

        <div className='playlist-actions'>
          {!playlist_detail.is_owner && (
            <button className='action favorite' onClick={toggleLikePlaylist}>
              {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          )}

          <button
            aria-label='more'
            id='playlist-item-button'
            aria-controls={openPlaylistMenu ? 'playlist-item-menu' : undefined}
            aria-expanded={openPlaylistMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClickMore}
            className='action more-btn'
          >
            <MdMoreHoriz />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PlaylistDetailInfor;
