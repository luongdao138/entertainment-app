import React, { useRef, useEffect } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz, MdDragIndicator, MdClose } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Checkbox, Menu } from '@mui/material';
import { Song, SongDetail, SongPrivacy } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeFavourite } from '../../redux/song/songActions';
import { toast } from 'react-toastify';
import SongItemMenu from '../SongItemMenu';
import SongPrivary from './SongPrivacy';
import { editSongSucess } from '../../redux/song/songSlice';
import {
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import { disableClickEvent } from '../../utils/common';
import { RotatingLines } from 'react-loader-spinner';
import AudioPlayingIcon from '../AudioPlayingIcon';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import MyTooltip from '../Tooltip';
interface Props {
  song: Song;
  focusSong?: string | null;
  changeFocusSong?: (song_id: string) => void;
  toggleSelectedSong?: (song_id: string) => void;
  clearSelectedSongs?: () => void;
  selectedSongs?: string[];
  is_dragging?: boolean;
  can_change_privacy?: boolean;
  can_edit_song?: boolean;
  can_delete_song?: boolean;
  can_drag?: boolean;
  handleOpenEditSongForm?: () => void;
  changeSelectedSong?: (song: Song) => void;
  can_remove_out_of_list?: boolean;
  handleOpenDeleteConfirmModal?: () => void;
  enable_select_multiple?: boolean;
  handleRemoveSongOutOfPlaylist?: (song_id: string) => void;
  onClickSongAudio?: (song_id: Song | SongDetail) => void;
  onAddSongsToPlayerQueue: (song: AudioSong) => void;
  onAddSongsToPlayNext: (song: AudioSong) => void;
  scrollToCurrentSong?: boolean;
  is_from_history?: boolean;
  can_play_with_lyric?: boolean;
  target_song_id?: string | null;
  deleteHistorySong?: (song_id: string) => void;
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
  can_play_with_lyric,
  changeSelectedSong,
  handleRemoveSongOutOfPlaylist,
  handleOpenEditSongForm,
  handleOpenDeleteConfirmModal,
  can_remove_out_of_list,
  enable_select_multiple,
  onClickSongAudio,
  onAddSongsToPlayNext,
  onAddSongsToPlayerQueue,
  scrollToCurrentSong,
  is_from_history,
  target_song_id,
  deleteHistorySong,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const audio_meta = useAppSelector(getAudioMetaSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isSelected = selectedSongs?.includes(song.id);
  const isFocused = focusSong === song.id;
  const isShowCheckbox = selectedSongs && selectedSongs.length > 0;
  const isActive = isFocused || isSelected;
  const is_current_audio = current_song?.id === song.id;

  const can_click_play =
    !audio_meta.is_audio_loading || current_song?.id !== song.id;

  // const is_owner = song.

  const dispatch = useAppDispatch();

  const handleClickSong = () => {
    if (enable_select_multiple) {
      clearSelectedSongs?.();
      changeFocusSong?.(song.id);
    }
  };

  const handleSelectSong = () => {
    toggleSelectedSong?.(song.id);
  };

  const handleClickCheckbox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    changeFocusSong?.(song.id);
  };

  const handleClickFavourite = async (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    const prevState = song.is_liked;
    // setIsLiked((prev) => !prev);
    dispatch(
      changeFavourite({
        data: song.id,
        onSuccess: () => {
          if (prevState) toast.success('???? x??a b??i h??t kh???i th?? vi???n');
          else toast.success('???? th??m b??i h??t v??o th?? vi??n');
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

  const handleDoubleClickSong = function (e: React.MouseEvent<HTMLDivElement>) {
    onClickSongAudio?.(song);
  };

  useEffect(() => {
    if (song.id === target_song_id) {
      if (containerRef.current) {
        scrollTo({
          top: containerRef.current.offsetTop - 200,
          behavior: 'smooth',
        });
      }
      return;
    }

    if (current_song?.id === song.id && scrollToCurrentSong) {
      if (containerRef.current) {
        scrollTo({
          top: containerRef.current.offsetTop - 200,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const renderSongIcon = (() => {
    if (current_song?.id !== song.id) {
      return <BsFillPlayFill className='play-state' />;
    } else {
      if (audio_meta.is_audio_loading) {
        return (
          <span className='play-state'>
            <RotatingLines
              strokeColor='#ffffff'
              strokeWidth='5'
              animationDuration='0.75'
              width='15'
              visible={true}
            />
          </span>
        );
      }

      if (audio_meta.is_audio_playing) {
        return (
          <span className='play-state'>
            <AudioPlayingIcon width={20} />
          </span>
        );
      } else {
        return <BsFillPlayFill className='play-state' />;
      }
    }
  })();

  // return null;

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
          onAddSongsToPlayNext={onAddSongsToPlayNext}
          onAddSongsToPlayerQueue={onAddSongsToPlayerQueue}
          can_play_with_lyric={can_play_with_lyric}
        />
      </Menu>
      <Container
        onClick={handleClickSong}
        is_active={isActive}
        is_liked={song.is_liked}
        is_show_checkbox={isShowCheckbox}
        is_selected={isSelected}
        is_dragging={is_dragging}
        enable_select_multiple={enable_select_multiple}
        is_current_audio={is_current_audio}
        ref={containerRef}
        onDoubleClick={handleDoubleClickSong}
        is_from_history={is_from_history}
      >
        <div className='song-left'>
          {!is_from_history && (
            <div className='music-icon' onDoubleClick={disableClickEvent}>
              {can_drag && enable_select_multiple ? (
                <MdDragIndicator style={{ fontSize: '2rem' }} />
              ) : (
                <FiMusic />
              )}
            </div>
          )}

          {enable_select_multiple && (
            <div className='song-checkbox' onDoubleClick={disableClickEvent}>
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
          )}

          <div
            className='song-thumbnail'
            onClick={() => {
              if (can_click_play) {
                console.log({ can_click_play });
                onClickSongAudio?.(song);
              }
            }}
            onDoubleClick={disableClickEvent}
          >
            <img src={song.thumbnail} alt='' />
            <div className='opacity'></div>
            {renderSongIcon}
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
          <MyTooltip
            title={song.is_liked ? 'X??a kh???i th?? vi???n' : 'Th??m v??o th?? vi???n'}
            placement='top'
          >
            <button
              className='favorite'
              onDoubleClick={disableClickEvent}
              onClick={handleClickFavourite}
            >
              {song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </MyTooltip>
          <span className='duration'>{formatSongDuration(song.duration)}</span>
          <MyTooltip title='Kh??c' placement='top'>
            <button
              onDoubleClick={disableClickEvent}
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
          </MyTooltip>

          {is_from_history && (
            <MyTooltip title='X??a' placement='top'>
              <button
                className='delete-btn'
                onClick={() => deleteHistorySong?.(song.id)}
              >
                <MdClose />
              </button>
            </MyTooltip>
          )}
        </div>
      </Container>
    </>
  );
};

export default SongItem;
