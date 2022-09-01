import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill, BsMusicNoteList } from 'react-icons/bs';
import { MdMoreHoriz, MdOutlineSkipNext } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { Checkbox, Menu } from '@mui/material';
import { HiOutlineBan } from 'react-icons/hi';
import { Song } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';
import { useAppDispatch } from '../../redux/hooks';
import { changeFavourite } from '../../redux/song/songActions';
import { toast } from 'react-toastify';
import fileSaver from 'file-saver';
interface Props {
  song: Song;
  focusSong: string | null;
  changeFocusSong: (song_id: string) => void;
  toggleSelectedSong: (song_id: string) => void;
  clearSelectedSongs: () => void;
  selectedSongs: string[];
}

const SongItem: React.FC<Props> = ({
  song,
  focusSong,
  changeFocusSong,
  clearSelectedSongs,
  toggleSelectedSong,
  selectedSongs,
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

  const handleDownloadSong = () => {
    fileSaver.saveAs(song.url);
  };

  useEffect(() => {
    setIsLiked(song.is_liked);
  }, [song.is_liked]);

  return (
    <Container
      onClick={handleClickSong}
      is_active={isActive}
      is_liked={is_liked}
      is_show_checkbox={isShowCheckbox}
      is_selected={isSelected}
    >
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        disablePortal
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
        <div className='song-menu'>
          <div className='menu-info'>
            <img
              src='https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1499881926.jpg'
              alt=''
            />
            <div className='menu-name'>
              <h4>Đào Hoa Nặc (Thượng Cổ Tình Ca)</h4>
              <p>Đặng Tử Kỳ</p>
            </div>
          </div>

          <div className='menu-btns'>
            <button onClick={handleDownloadSong}>
              <FiDownload />
              <span>Tải xuống</span>
            </button>
            <button>
              <BsMusicNoteList />
              <span>Lời bài hát</span>
            </button>
            <button>
              <HiOutlineBan />
              <span>Chặn</span>
            </button>
          </div>

          <ul className='menu-list'>
            <li>
              <MdOutlineSkipNext />
              <span>Phát tiếp theo</span>
            </li>
            <li>
              <MdOutlineSkipNext />
              <span>Phát tiếp theo</span>
            </li>
            <li>
              <MdOutlineSkipNext />
              <span>Phát tiếp theo</span>
            </li>
            <li>
              <MdOutlineSkipNext />
              <span>Phát tiếp theo</span>
            </li>
          </ul>
        </div>
      </Menu>
      <div className='song-left'>
        <div className='music-icon'>
          <FiMusic />
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
      <div className='song-right'>
        <button className='favorite' onClick={handleClickFavourite}>
          {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <span className='duration'>{formatSongDuration(song.duration)}</span>
        <div className='song-menu-wrapper'>
          <button
            className='more-action'
            aria-label='more'
            id='long-button'
            aria-controls={openMenu ? 'long-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MdMoreHoriz />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SongItem;
