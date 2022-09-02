import React, { useState } from 'react';
import { MdSort, MdPlaylistAdd, MdMoreHoriz } from 'react-icons/md';
import SongItem from '../SongItem';
import { Container } from './style';
import { Checkbox, ClickAwayListener, Menu } from '@mui/material';
import SongSortMenu from '../SongSortMenu';
import { Song } from '../../services/song';
import AddToPlaylist from '../AddToPlaylist';

interface Props {
  songs: Song[];
}

const SongList: React.FC<Props> = ({ songs }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLElement | null>(null);
  const openSortMenu = Boolean(anchorEl);
  const openMoreMenu = Boolean(moreAnchorEl);
  const [sort, setSort] = useState<string>('');
  const [focusSong, setFocusSong] = useState<string | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const changeSort = (value: string) => {
    setSort(value);
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

  return (
    <Container>
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
        <SongSortMenu value={sort} changeValue={changeSort} />
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
        <AddToPlaylist />
      </Menu>
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

            <button className='add-playlist'>
              <MdPlaylistAdd />
              <span>Thêm vào danh sách phát</span>
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
            <span className='song-label'>Bài hát</span>
          </div>
        )}

        <span className='list-header-right'>Thời gian</span>
      </div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div className='list-content'>
          {songs.map((song) => (
            <SongItem
              key={song.id}
              song={song}
              changeFocusSong={changeFocusSong}
              focusSong={focusSong}
              clearSelectedSongs={clearSelectedSongs}
              toggleSelectedSong={toggleSelectedSong}
              selectedSongs={selectedSongs}
            />
          ))}
        </div>
      </ClickAwayListener>
    </Container>
  );
};

export default SongList;
