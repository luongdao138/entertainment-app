import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  MdSort,
  MdPlaylistAdd,
  MdMoreHoriz,
  MdOutlineDeleteOutline,
} from 'react-icons/md';
import SongItem from '../SongItem';
import { Container, SongListMenuContainer } from './style';
import { Checkbox, ClickAwayListener, Menu } from '@mui/material';
import SongSortMenu from '../SongSortMenu';
import {
  changeFavourite,
  deleteUploadSong,
  Song,
  SongDetail,
} from '../../services/song';
import AddToPlaylist from '../AddToPlaylist';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { useAppDispatch } from '../../redux/hooks';
import {
  changeSongsPosition,
  deleteMultipleSongsOutOfPlaylist,
} from '../../redux/playlistDetail/playlistDetailSlice';
import {
  changeSongPositionInPlaylist,
  ChangeSongPositionInPlaylistParams,
  removeSongOutOfPlaylist,
} from '../../services/playlist';
import { logout } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {
  removeSongOutOfFavourite,
  removeUploadSongs,
} from '../../redux/song/songSlice';
import { useAudioContext } from '../../context/AudioContext';
import { SortType } from '../../constants/options';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';

interface Props {
  songs: Song[];
  playlist_id?: string;
  can_drag?: boolean;
  can_change_privacy?: boolean;
  can_edit_song?: boolean;
  can_delete_song?: boolean;
  can_remove_out_of_list?: boolean;
  can_change_favourite_songs?: boolean;
  can_remove_out_of_upload?: boolean;
  handleOpenEditSongForm?: () => void;
  changeSelectedSong?: (song: Song) => void;
  handleRemoveSongOutOfPlaylist?: (song_id: string) => void;
  handleOpenDeleteConfirmModal?: () => void;
  onClickSongAudio?: (song_id: Song | SongDetail) => void;
  enable_select_multiple?: boolean;
  scrollToCurrentSong?: boolean;
  target_song_id?: string | null;
}

const SongList: React.FC<Props> = ({
  songs,
  playlist_id,
  can_drag,
  can_delete_song,
  can_edit_song,
  can_change_privacy,
  can_remove_out_of_list,
  handleOpenEditSongForm,
  changeSelectedSong,
  handleRemoveSongOutOfPlaylist,
  can_change_favourite_songs,
  can_remove_out_of_upload,
  handleOpenDeleteConfirmModal,
  enable_select_multiple,
  onClickSongAudio,
  scrollToCurrentSong,
  target_song_id,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLElement | null>(null);
  const openSortMenu = Boolean(anchorEl);
  const openMoreMenu = Boolean(moreAnchorEl);
  const [focusSong, setFocusSong] = useState<string | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [sort_type, setSortType] = useState<SortType>('default');
  const { handleAddSongsToPlayerQueue, handleAddSongToPlayNext } =
    useAudioContext();

  const onAddSongsToPlayerQueue = (song: AudioSong) => {
    handleAddSongsToPlayerQueue({
      playlist: null,
      songs: [song],
      queue_playlist_id: playlist_id,
    });
  };

  const onAddSongsToPlayNext = (song: AudioSong) => {
    handleAddSongToPlayNext({
      song,
      queue_playlist_id: playlist_id,
    });
  };

  const sorted_songs = useMemo(() => {
    let new_songs = [...songs];
    switch (sort_type) {
      case 'name_az':
        new_songs.sort((a, b) => (a.name > b.name ? 1 : -1));
        return new_songs;
      case 'name_za':
        new_songs.sort((a, b) => (a.name < b.name ? 1 : -1));
        return new_songs;

      default:
        return songs;
    }
  }, [sort_type, songs]);

  const changeSortType = (value: SortType) => {
    setSortType(value);
    handleCloseSortMenu();
  };

  const handleOpenSortMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleOpenMoreMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setMoreAnchorEl(e.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseMoreMenu = () => {
    setMoreAnchorEl(null);
  };

  const changeFocusSong = (song_id: string) => {
    setFocusSong(song_id);
  };

  const handleClickAway = () => {
    setFocusSong(null);
  };

  const toggleSelectedSong = (song_id: string) => {
    const is_exist = selectedSongs.includes(song_id);
    if (is_exist) {
      setSelectedSongs(selectedSongs.filter((id) => id !== song_id));
    } else {
      setSelectedSongs((prev) => [...prev, song_id]);
    }
  };

  const clearSelectedSongs = () => {
    setSelectedSongs([]);
  };

  const toggleSelectAllSongs = () => {
    if (selectedSongs.length === songs.length) {
      clearSelectedSongs();
    } else {
      setSelectedSongs(songs.map((song) => song.id));
    }
  };

  const debounceChangeSongsPosition = useCallback(
    _.debounce(async (params: ChangeSongPositionInPlaylistParams) => {
      try {
        await changeSongPositionInPlaylist(params);
      } catch (error: any) {
        toast.error(error.response?.data.msg || 'C?? l???i x???y ra');
        if (error.response?.status === 403) {
          localStorage.removeItem('music_token');
          dispatch(logout());
        }
      }
    }, 500),
    []
  );

  const onDragEnd = async (result: DropResult, provided: ResponderProvided) => {
    const { destination, draggableId, source } = result;
    if (destination && playlist_id) {
      if (destination.index === source.index) return;

      console.log({ source, destination, draggableId });
      let new_songs = [...songs];
      const [removed] = new_songs.splice(source.index, 1);
      new_songs.splice(destination.index, 0, removed);

      dispatch(changeSongsPosition(new_songs));
      debounceChangeSongsPosition({
        playlist_id,
        new_songs: new_songs.map((ns) => ns.id),
      });
    }
  };

  const converSelectedSongs = () => {
    // s???p x???p c??c b??i h??t ???? ???????c ch???n theo th??? t??? t??ng d???n v??? position
    let new_selected_songs: any[] = selectedSongs.map((song_id) =>
      songs.find((song) => song.id === song_id)
    );

    new_selected_songs = _.clone(new_selected_songs);
    new_selected_songs.sort((a, b) => (a.position > b.position ? 1 : -1));

    return new_selected_songs;
  };

  const handleDeleteSelectedSongsOutOfPlaylist = async () => {
    if (!playlist_id) return;
    try {
      for (const song_id of selectedSongs) {
        await removeSongOutOfPlaylist({ playlist_id, song_id });
      }

      toast.success('???? x??a b??i h??t kh???i playlist th??nh c??ng');
      dispatch(deleteMultipleSongsOutOfPlaylist(selectedSongs));

      handleCloseMoreMenu();
      clearSelectedSongs();
      setFocusSong(null);
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'C?? l???i x???y ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleDeleteUploadsSong = async () => {
    try {
      for (const song_id of selectedSongs) {
        await deleteUploadSong(song_id);
      }

      dispatch(removeUploadSongs(selectedSongs));
      toast.success('X??a b??i h??t th??nh c??ng');

      handleCloseMoreMenu();
      clearSelectedSongs();
      setFocusSong(null);
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'C?? l???i x???y ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleToggleSelectedSongsFavourite = async () => {
    try {
      for (const song_id of selectedSongs) {
        await changeFavourite(song_id);
      }

      dispatch(removeSongOutOfFavourite(selectedSongs));
      toast.success('???? x??a b??i h??t kh???i th?? vi???n');

      handleCloseMoreMenu();
      clearSelectedSongs();
      setFocusSong(null);
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'C?? l???i x???y ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleReset = () => {
    clearSelectedSongs();
    setFocusSong(null);
    setSortType('default');
    handleCloseSortMenu();
    handleCloseMoreMenu();
  };

  const handleAddSongsToPlayer = () => {
    const new_songs = selectedSongs.map(
      (s) => songs.find((song) => song.id === s) as Song
    );
    handleAddSongsToPlayerQueue({
      songs: new_songs,
      playlist: null,
    });
  };

  useEffect(() => {
    return handleReset;
  }, [playlist_id]);

  useEffect(() => {
    if (target_song_id) {
      setFocusSong(target_song_id);
    }
  }, [target_song_id]);

  return (
    <Container>
      {/* Add loading when making request */}
      {/* <FullscreenLoading open={isAddingSongToPlaylist} /> */}

      <Menu
        id='sort-menu'
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
        disablePortal
        anchorEl={anchorEl}
        open={openSortMenu}
        onClose={handleCloseSortMenu}
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
        <SongSortMenu value={sort_type} changeValue={changeSortType} />
      </Menu>

      <Menu
        id='more-menu'
        MenuListProps={{
          'aria-labelledby': 'more-button',
        }}
        anchorEl={moreAnchorEl}
        open={openMoreMenu}
        onClose={handleCloseMoreMenu}
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
        <SongListMenuContainer>
          <AddToPlaylist song_item={converSelectedSongs()} />
          {can_remove_out_of_list && (
            <div
              onClick={handleDeleteSelectedSongsOutOfPlaylist}
              className='menu-item'
            >
              <MdOutlineDeleteOutline />
              <span>X??a kh???i playlist n??y</span>
            </div>
          )}
          {can_change_favourite_songs && (
            <div
              onClick={handleToggleSelectedSongsFavourite}
              className='menu-item'
            >
              <MdOutlineDeleteOutline />
              <span>X??a kh???i danh s??ch y??u th??ch</span>
            </div>
          )}
          {can_remove_out_of_upload && (
            <div onClick={handleDeleteUploadsSong} className='menu-item'>
              <MdOutlineDeleteOutline />
              <span>X??a kh???i danh s??ch t???i l??n</span>
            </div>
          )}
        </SongListMenuContainer>
      </Menu>
      {enable_select_multiple && (
        <div className='list-header'>
          {selectedSongs.length > 0 ? (
            <div className='list-header-left'>
              <Checkbox
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{
                  padding: 0,
                  color: 'hsla(0,0%,100%,0.2)',
                  '&.Mui-checked .MuiSvgIcon-root': {
                    color: '#7200a1',
                  },
                }}
                onChange={toggleSelectAllSongs}
                checked={selectedSongs.length === songs.length}
              />

              <button
                className='add-playlist'
                onClick={handleAddSongsToPlayer}
                // disabled={isAddingSongToPlaylist}
              >
                <MdPlaylistAdd />
                <span>Th??m v??o danh s??ch ph??t</span>
              </button>

              <button
                className='more-icon'
                aria-label='more'
                id='more-button'
                aria-controls={openMoreMenu ? 'more-menu' : undefined}
                aria-expanded={openMoreMenu ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleOpenMoreMenu}
              >
                <MdMoreHoriz />
              </button>
            </div>
          ) : (
            <div className='list-header-left'>
              <button
                aria-label='more'
                id='sort-button'
                aria-controls={openSortMenu ? 'sort-menu' : undefined}
                aria-expanded={openSortMenu ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleOpenSortMenu}
                className='sort-icon'
              >
                <MdSort />
              </button>
              <span className='song-label'>B??i h??t</span>
            </div>
          )}

          <span className='list-header-right'>Th???i gian</span>
        </div>
      )}

      <ClickAwayListener onClickAway={handleClickAway}>
        <div className='list-content'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              key={'song-list-droppable'}
              droppableId='song-list-droppable'
            >
              {({ droppableProps, innerRef, placeholder }) => (
                <div ref={innerRef} {...droppableProps}>
                  {sorted_songs.map((song, index) => (
                    <Draggable
                      key={song.id}
                      draggableId={song.id}
                      index={index}
                      isDragDisabled={
                        !Boolean(can_drag) || sort_type !== 'default'
                      }
                    >
                      {(
                        { draggableProps, innerRef, dragHandleProps },
                        { isDragging }
                      ) => (
                        <div
                          ref={innerRef}
                          {...draggableProps}
                          {...dragHandleProps}
                          style={{
                            ...draggableProps.style,
                            zIndex: 800,
                            cursor: 'default',
                          }}
                        >
                          <SongItem
                            key={song.id}
                            song={song}
                            changeFocusSong={changeFocusSong}
                            focusSong={focusSong}
                            clearSelectedSongs={clearSelectedSongs}
                            toggleSelectedSong={toggleSelectedSong}
                            selectedSongs={selectedSongs}
                            is_dragging={isDragging}
                            can_change_privacy={can_change_privacy}
                            can_drag={Boolean(can_drag)}
                            can_edit_song={can_edit_song}
                            can_delete_song={can_delete_song}
                            handleOpenEditSongForm={handleOpenEditSongForm}
                            can_remove_out_of_list={can_remove_out_of_list}
                            changeSelectedSong={changeSelectedSong}
                            handleRemoveSongOutOfPlaylist={
                              handleRemoveSongOutOfPlaylist
                            }
                            handleOpenDeleteConfirmModal={
                              handleOpenDeleteConfirmModal
                            }
                            enable_select_multiple={enable_select_multiple}
                            onClickSongAudio={onClickSongAudio}
                            onAddSongsToPlayNext={onAddSongsToPlayNext}
                            onAddSongsToPlayerQueue={onAddSongsToPlayerQueue}
                            scrollToCurrentSong={scrollToCurrentSong}
                            target_song_id={target_song_id}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </ClickAwayListener>
    </Container>
  );
};

export default SongList;
