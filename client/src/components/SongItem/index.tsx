import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz, MdDragIndicator } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Checkbox, Menu } from '@mui/material';
import { Song, SongPrivacy } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';
import { useAppDispatch } from '../../redux/hooks';
import { changeFavourite } from '../../redux/song/songActions';
import { toast } from 'react-toastify';
import SongItemMenu from '../SongItemMenu';
import SongPrivary from './SongPrivacy';
import { editSongSucess } from '../../redux/song/songSlice';
interface Props {
  song: Song;
  focusSong: string | null;
  changeFocusSong: (song_id: string) => void;
  toggleSelectedSong: (song_id: string) => void;
  clearSelectedSongs: () => void;
  selectedSongs: string[];
  is_dragging?: boolean;
  can_change_privacy?: boolean;
  can_edit_song?: boolean;
  can_delete_song?: boolean;
  can_drag?: boolean;
  handleOpenEditSongForm?: () => void;
  changeSelectedSong?: (song: Song) => void;
  can_remove_out_of_list?: boolean;
  handleOpenDeleteConfirmModal: () => void;
  handleRemoveSongOutOfPlaylist?: (song_id: string) => void;
}

const SongItem: React.FC<Props> = ({
  song,
  focusSong,
  changeFocusSong,
  clearSelectedSongs,
  toggleSelectedSong,
  selectedSongs,
  is_dragging,
  can_drag,
  can_change_privacy,
  can_delete_song,
  can_edit_song,
  changeSelectedSong,
  handleRemoveSongOutOfPlaylist,
  handleOpenEditSongForm,
  handleOpenDeleteConfirmModal,
  can_remove_out_of_list,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isSelected = selectedSongs.includes(song.id);
  const isFocused = focusSong === song.id;
  const isShowCheckbox = selectedSongs.length > 0;
  const isActive = isFocused || isSelected;

  // const is_owner = song.

  const dispatch = useAppDispatch();

  const handleClickSong = () => {
    clearSelectedSongs();
    changeFocusSong(song.id);
  };

  const handleSelectSong = () => {
    toggleSelectedSong(song.id);
  };

  const handleClickCheckbox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    changeFocusSong(song.id);
  };

  const handleClickFavourite = async () => {
    const prevState = is_liked;
    setIsLiked((prev) => !prev);
    dispatch(
      changeFavourite({
        data: song.id,
        onSuccess: () => {
          if (prevState) toast.success('Đã xóa bài hát khỏi thư viện');
          else toast.success('Đã thêm bài hát vào thư viên');
        },
        onError(error) {
          toast.error(error);
        },
      })
    );
  };

  const handleChangePrivacySuccess = (new_privacy: SongPrivacy) => {
    dispatch(editSongSucess({ song: { ...song, privacy: new_privacy } }));
  };

  useEffect(() => {
    setIsLiked(song.is_liked);
  }, [song.is_liked]);

  return (
    <>
      <Menu
        id='song-item-menu'
        MenuListProps={{
          'aria-labelledby': 'song-item-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
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
        <SongItemMenu
          song={song}
          handleOpenEditSongForm={handleOpenEditSongForm}
          can_delete_song={can_delete_song}
          can_edit_song={can_edit_song}
          changeSelectedSong={changeSelectedSong}
          closeSongItemAction={handleClose}
          handleRemoveSongOutOfPlaylist={handleRemoveSongOutOfPlaylist}
          can_remove_out_of_list={can_remove_out_of_list}
          handleOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
        />
      </Menu>
      <Container
        onClick={handleClickSong}
        is_active={isActive}
        is_liked={is_liked}
        is_show_checkbox={isShowCheckbox}
        is_selected={isSelected}
        is_dragging={is_dragging}
      >
        <div className='song-left'>
          <div className='music-icon'>
            {can_drag ? (
              <MdDragIndicator style={{ fontSize: '2rem' }} />
            ) : (
              <FiMusic />
            )}
          </div>

          <div className='song-checkbox'>
            <Checkbox
              disableRipple
              disableTouchRipple
              disableFocusRipple
              sx={{
                padding: 0,
                color: isActive ? '#fff' : 'hsla(0,0%,100%,0.2)',
                '&.Mui-checked .MuiSvgIcon-root': {
                  color: '#7200a1',
                },
              }}
              onChange={handleSelectSong}
              checked={isSelected}
              onClick={handleClickCheckbox}
            />
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

        {can_change_privacy && (
          <SongPrivary
            song_id={song.id}
            initial_privacy={song.privacy || 'private'}
            onChangePrivacySuccess={handleChangePrivacySuccess}
          />
        )}

        <div className='song-right'>
          <button className='favorite' onClick={handleClickFavourite}>
            {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <span className='duration'>{formatSongDuration(song.duration)}</span>
          <button
            className='more-action'
            aria-label='more'
            id='song-item-button'
            aria-controls={openMenu ? 'song-item-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MdMoreHoriz />
          </button>
        </div>
      </Container>
    </>
  );
};

export default SongItem;
