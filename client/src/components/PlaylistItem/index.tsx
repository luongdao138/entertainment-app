import React, { startTransition, useEffect, useState } from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { Container, SidebarItemContainer } from './style';
import { Link, useNavigate } from 'react-router-dom';
import { Playlist } from '../../services/playlist';
import { Menu } from '@mui/material';
import PlaylistItemMenu from '../PlaylistItemMenu';
import ConfirmDialog from '../ConfirmDialog';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import appRoutes from '../../constants/appRoutes';
import {
  changePlaylistFavourite,
  deletePlaylist,
} from '../../redux/playlist/playlistActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { clearMetaData } from '../../redux/metadata/actions';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import LoginRequired from '../LoginRequired';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../constants/images';
import { toast } from 'react-toastify';
import {
  getAudioCurrentListSongs,
  getAudioCurrentPlaylistSelector,
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import { useAudioContext } from '../../context/AudioContext';
import AudioPlayingIcon from '../AudioPlayingIcon';
import MyTooltip from '../Tooltip';

interface Props {
  playlist: Playlist;
  is_from_sidebar?: boolean;
  onDeletePlaylistSuccess?: () => void;
  showChangeFavouriteConfirmModal?: boolean;
}

const deletePlaylistMetaSelector = createMetaSelector(deletePlaylist);

const PlaylistItem: React.FC<Props> = ({
  playlist,
  onDeletePlaylistSuccess,
  showChangeFavouriteConfirmModal = false,
  is_from_sidebar = false,
}) => {
  const { changeToEditMode, setEditedPlaylist, openUploadPlaylistForm } =
    useUploadPlaylistContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [is_liked, setIsLiked] = useState<boolean>(Boolean(playlist.is_liked));
  const [isShowChangeFavouriteModal, setIsShowChangeFavouriteModal] =
    useState<boolean>(false);
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);
  const deletePlaylistMeta = useAppSelector(deletePlaylistMetaSelector);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const { handleToggleAudioPlayState } = useAudioContext();
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);

  const is_playing =
    is_audio_playing &&
    current_playlist?.id === playlist.id &&
    Boolean(
      audio_list_songs.find((s) => s.is_current_audio)?.queue_playlist_id
    );
  // && current_playlist_songs.some((s) => s.id === current_song?.id);

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

  const openChangeFavouriteConfirmModal = () => {
    setIsShowChangeFavouriteModal(true);
  };

  const closeChangeFavouriteConfirmModal = () => {
    setIsShowChangeFavouriteModal(false);
  };

  const handleDeletePlaylist = async () => {
    dispatch(
      deletePlaylist({
        data: { id: playlist.id },
        onSuccess: () => {
          handleCloseDeleteConfirmModal();
          onDeletePlaylistSuccess?.();
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

  const handleLikePlaylist = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (showChangeFavouriteConfirmModal) {
      openChangeFavouriteConfirmModal();
    } else {
      const prev = Boolean(playlist.is_liked);
      // setIsLiked((prev) => !prev);
      // onClickLikePlaylist?.();
      dispatch(
        changePlaylistFavourite({
          data: playlist.id,
          onSuccess() {
            if (prev) {
              toast.success('???? x??a playlist kh???i th?? vi???n');
            } else {
              toast.success('???? th??m playlist v??o th?? vi???n');
            }
          },
          onError(error) {
            toast.error(error);
          },
        })
      );
    }
  };

  const handleClickPlayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (current_playlist?.id === playlist.id) {
      // ????y l?? tr?????ng h???p user click v??o playlist ??ang ??c ch???n, tr?????ng h???p n??y ch??? c???n thay ?????i tr???ng th??i play/pause l?? ??c
      // s??? x??? l?? sau
      handleToggleAudioPlayState();
    } else {
      navigate(`/playlist/${playlist.id}`, {
        state: { play_audio: true, playlist_id: playlist.id },
      });
    }
  };

  useEffect(() => {
    dispatch(clearMetaData(deletePlaylist.typePrefix));
  }, []);

  return (
    <>
      <Menu
        id='playlist-item-menu'
        MenuListProps={{
          'aria-labelledby': 'playlist-item-button',
        }}
        // disablePortal
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
          playlist={playlist}
          can_delete={playlist.can_delete}
          can_edit={playlist.can_edit}
          onOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
          onOpenEditForm={handleOpenEditPlaylistForm}
          closePlaylistItemMenu={handleClose}
        />
      </Menu>

      {playlist.can_delete && (
        <ConfirmDialog
          desc='Playlist c???a b???n s??? b??? x??a kh???i th?? vi???n c?? nh??n. B???n c?? mu???n x??a?'
          title='X??a Playlist'
          open={openDeleteConfirmModal}
          onCancel={handleCloseDeleteConfirmModal}
          onOk={handleDeletePlaylist}
          is_pending={deletePlaylistMeta.pending}
        />
      )}

      {showChangeFavouriteConfirmModal && (
        <ConfirmDialog
          desc='Playlist b???n y??u th??ch s??? b??? x??a kh???i th?? vi???n c?? nh??n. B???n c?? mu???n x??a?'
          title='X??a Playlist'
          open={isShowChangeFavouriteModal}
          onCancel={closeChangeFavouriteConfirmModal}
          onOk={() => {
            // setIsLiked((prev) => !prev);
            // onClickLikePlaylist?.();
            dispatch(
              changePlaylistFavourite({
                data: playlist.id,
              })
            );
          }}
        />
      )}

      {is_from_sidebar ? (
        <SidebarItemContainer
          to={appRoutes.PLAYLIST_DETAIL.replace(':playlist_id', playlist.id)}
        >
          <span className='name'> {playlist.title}</span>

          <button
            className='more-btn'
            aria-label='more'
            id='playlist-item-button'
            aria-controls={openPlaylistMenu ? 'playlist-item-menu' : undefined}
            aria-expanded={openPlaylistMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClickMore}
          >
            <MdMoreHoriz />
          </button>
        </SidebarItemContainer>
      ) : (
        <Container
          is_multiple={playlist.has_songs.length >= 4}
          is_liked={playlist.is_liked}
          is_playing={is_playing}
        >
          <Link
            to={appRoutes.PLAYLIST_DETAIL.replace(':playlist_id', playlist.id)}
            className='thumbnail-container'
          >
            {playlist.has_songs.length === 0 ? (
              <img src={DEFAULT_PLAYLIST_THUMBNAIL} alt='' />
            ) : playlist.has_songs.length >= 4 ? (
              <div className='imgs'>
                <img src={playlist.has_songs[0].song.thumbnail} alt='' />
                <img src={playlist.has_songs[1].song.thumbnail} alt='' />
                <img src={playlist.has_songs[2].song.thumbnail} alt='' />
                <img src={playlist.has_songs[3].song.thumbnail} alt='' />
              </div>
            ) : (
              <img src={playlist.has_songs[0].song.thumbnail} />
            )}

            <div className='thumbnail-backdrop'></div>

            <div className='thumbnail-actions'>
              {playlist.is_owner && playlist.can_delete ? (
                <MyTooltip title='X??a' placement='top'>
                  <button
                    className='action'
                    onClick={handleOpenDeleteConfirmModal}
                  >
                    <MdClose />
                  </button>
                </MyTooltip>
              ) : (
                <LoginRequired>
                  <MyTooltip
                    placement='top'
                    title={
                      playlist.is_liked
                        ? 'X??a kh???i th?? vi???n'
                        : 'Th??m v??o th?? vi???n'
                    }
                  >
                    <button className='favorite' onClick={handleLikePlaylist}>
                      {playlist.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                  </MyTooltip>
                </LoginRequired>
              )}

              <button className='play-state' onClick={handleClickPlayButton}>
                {is_playing ? <AudioPlayingIcon /> : <BsFillPlayFill />}
              </button>

              <div>
                <MyTooltip title='Kh??c' placement='top'>
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
                </MyTooltip>
              </div>
            </div>
          </Link>

          <Link to={`/playlist/${playlist.id}`} className='name'>
            {playlist.title}
          </Link>
          <p className='author'>{playlist.creator.full_name}</p>
        </Container>
      )}
    </>
  );
};

export default PlaylistItem;
