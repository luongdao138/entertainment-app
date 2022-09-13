import { Menu } from '@mui/material';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdMoreHoriz } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { logout } from '../../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeFavourite } from '../../../redux/song/songActions';
import { disableClickEvent } from '../../../utils/common';
import LoginRequired from '../../LoginRequired';
import SongItemMenu from '../../SongItemMenu';
import MyTooltip from '../../Tooltip';
import { Container } from './style';

interface Props {}

const AudioSong: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLikeSong = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (current_song) {
      try {
        const prev = current_song.is_liked;
        // setIsLiked((prev) => !prev);
        dispatch(
          changeFavourite({
            data: current_song.id,
            onSuccess() {
              if (prev) {
                toast.success('Đã xóa bài hát khỏi thư viện');
              } else {
                toast.success('Đã thêm bài hát vào thư viện');
              }
            },
          })
        );
      } catch (error: any) {
        toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
        if (error.response?.status === 403) {
          localStorage.removeItem('music_token');
          dispatch(logout());
        }
      }
    }
  };

  const handleGoToUserPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    navigate('/');
  };

  if (!current_song) return null;

  return (
    <>
      <Menu
        id='song-item-menu'
        MenuListProps={{
          'aria-labelledby': 'song-item-button',
        }}
        anchorEl={anchorEl}
        open={openSongMenu}
        onClose={handleCloseSongMenu}
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
        onClick={disableClickEvent}
      >
        <SongItemMenu
          song={current_song}
          closeSongItemAction={handleCloseSongMenu}
          disable_add_to_play_next
          disable_add_to_player_queue
        />
      </Menu>
      <Container is_liked={current_song.is_liked}>
        <div className='song-thumbnail'>
          <img src={current_song.thumbnail} alt='' />
        </div>
        <div className='song-info'>
          <Link to={`/song/${current_song.id}`} className='song-name'>
            {current_song.name}
          </Link>
          <Link onClick={handleGoToUserPage} className='singer-name' to='/'>
            {current_song.singer_name}
          </Link>
        </div>

        <div className='song-actions'>
          <LoginRequired>
            <MyTooltip placement='top' title='Thêm vào thư viện'>
              <button onClick={handleClickLikeSong} className='action like-btn'>
                {current_song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </MyTooltip>
          </LoginRequired>

          <MyTooltip placement='top' title='Xem thêm'>
            <button
              className='action more-action'
              aria-label='more'
              id='song-item-button'
              aria-controls={openSongMenu ? 'song-item-menu' : undefined}
              aria-expanded={openSongMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleOpenSongMenu}
            >
              <MdMoreHoriz />
            </button>
          </MyTooltip>
        </div>
      </Container>
    </>
  );
};

export default AudioSong;
