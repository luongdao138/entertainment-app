import { Menu } from '@mui/material';
import _ from 'lodash';
import React, { useRef, startTransition, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineModeEdit, MdPause, MdMoreHoriz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import appRoutes from '../../constants/appRoutes';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../constants/images';
import { useAudioContext } from '../../context/AudioContext';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import {
  getAudioCurrentListSongs,
  getAudioCurrentPlaylistSelector,
  getAudioMetaSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePlaylistFavourite } from '../../redux/playlist/playlistActions';
import { deletePlaylist, PlaylistDetail } from '../../services/playlist';
import { Song } from '../../services/song';
import AudioPlayingIcon from '../AudioPlayingIcon';
import ConfirmDialog from '../ConfirmDialog';
import LoginRequired from '../LoginRequired';
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
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);

  const { changeToEditMode, setEditedPlaylist, openUploadPlaylistForm } =
    useUploadPlaylistContext();
  const { handleClickSongAudio, handleToggleAudioPlayState } =
    useAudioContext();
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    useState<boolean>(false);
  const [is_changed, setIsChanged] = useState<boolean>(false);
  const isFirstRender = useRef<boolean>(true);
  const { is_audio_playing, is_audio_loading } =
    useAppSelector(getAudioMetaSelector);

  const is_playing =
    is_audio_playing &&
    current_playlist?.id === playlist_detail.id &&
    Boolean(
      audio_list_songs.find((s) => s.is_current_audio)?.queue_playlist_id
    );

  const onClickSongAudio = () => {
    if (is_audio_loading) return;

    if (playlist_detail.id !== current_playlist?.id) {
      const shuffled_list = _.shuffle(songs);
      // nếu bài hát đang đc chọn không thuộc playlist này => chọn playlist và phát bài hát của playlist này
      handleClickSongAudio({
        // playlist: playlist_detail,
        // list_songs: songs,
        // song: playlist_detail.play_random ? shuffled_list[0] : songs[0],
        // playlist_play_random: playlist_detail.play_random,

        playlist: playlist_detail,
        list_songs: songs,
        song: !playlist_detail.is_owner
          ? songs[0]
          : playlist_detail.play_random
          ? shuffled_list[0]
          : songs[0],
        force_replace: true,
        playlist_play_random: playlist_detail?.is_owner
          ? playlist_detail.play_random
          : undefined,
        playlist_songs: songs,
      });
    } else {
      // ngược lại, thay đổi trạng thái play/pause của bài hát đang được phát
      handleToggleAudioPlayState();
    }
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
    const prev = playlist_detail.is_liked;
    // setIsLiked((prev) => !prev);
    // onClickLikePlaylist?.();
    dispatch(
      changePlaylistFavourite({
        data: playlist_detail.id,
        onSuccess() {
          if (prev) {
            toast.success('Đã xóa playlist khỏi thư viện');
          } else {
            toast.success('Đã thêm playlist vào thư viện');
          }
        },
        onError(error) {
          toast.error(error);
        },
      })
    );
  };

  useEffect(() => {
    if (is_playing && !is_audio_loading) setIsChanged(true);
  }, [is_playing, is_audio_loading]);

  return (
    <Container
      is_changed={is_changed}
      is_playing={is_playing}
      is_current_audio={is_current_audio}
      is_liked={playlist_detail.is_liked}
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
          playlist={playlist_detail}
          can_delete={playlist_detail.can_delete}
          can_edit={playlist_detail.can_edit}
          onOpenEditForm={handleOpenEditPlaylistForm}
          onOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
          closePlaylistItemMenu={handleClose}
        />
      </Menu>
      <div className='playlist-thumbnail-container' onClick={onClickSongAudio}>
        <div className='thumbnail-icon'>
          <button className='play-state'>
            {is_playing ? <AudioPlayingIcon /> : <BsFillPlayFill />}
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

        <button className='play-btn' onClick={onClickSongAudio}>
          {is_playing ? <MdPause /> : <BsFillPlayFill />}
          <span>
            {current_playlist?.id === playlist_detail.id
              ? is_playing
                ? 'Tạm dừng'
                : 'Tiếp tục phát'
              : playlist_detail.play_random
              ? 'Phát ngẫu nhiên'
              : 'Phát tất cả'}
          </span>
        </button>

        <div className='playlist-actions'>
          {!playlist_detail.is_owner && (
            <LoginRequired>
              <button className='action favorite' onClick={toggleLikePlaylist}>
                {playlist_detail.is_liked ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </LoginRequired>
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
