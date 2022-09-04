import { Menu } from '@mui/material';
import React, { useState, startTransition } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdPause, MdMoreHoriz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { changeFavourite, Song, SongDetail } from '../../services/song';
import AudioLoadingIcon from '../AudioPlayingIcon';
import LoginRequired from '../LoginRequired';
import SongItemMenu from '../SongItemMenu';
import { Container } from './style';

interface Props {
  is_current_audio?: boolean;
  song: SongDetail;
}

const SongDetailInfor: React.FC<Props> = ({ is_current_audio, song }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [is_changed, setIsChanged] = useState<boolean>(false);
  const [is_playing, setIsPlaying] = useState<boolean>(false);
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);

  const handleChangePlayState = () => {
    setIsChanged(true);
    setIsPlaying((prev) => !prev);
  };

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLikeSong = async () => {
    try {
      const prev = is_liked;
      startTransition(() => {
        setIsLiked((prev) => !prev);
      });

      await changeFavourite(song.id);
      if (prev) {
        toast.success('Đã xóa bài hát khỏi thư viện');
      } else {
        toast.success('Đã thêm bài hát vào thư viện');
      }
    } catch (error: any) {
      toast.error(error.response?.data.msg);
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  return (
    <Container
      is_liked={is_liked}
      is_changed={is_changed}
      is_playing={is_playing}
      is_current_audio={is_current_audio}
    >
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
        {/* Song menu here */}
        <SongItemMenu song={song} closeSongItemAction={handleClose} />
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

        <div className='playlist-thumbnail'>
          <img src={song.thumbnail} alt='' />
          <div className='thumbnail-backdrop'></div>
        </div>
      </div>

      <div className='playlist-info-content'>
        <div className='playlist-name'>
          <h2>{song.name}</h2>
        </div>

        <p className='creator'>
          Tạo bởi <span>{song.user.full_name}</span>
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
          <LoginRequired>
            <button className='action favorite' onClick={toggleLikeSong}>
              {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </LoginRequired>

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

export default SongDetailInfor;
