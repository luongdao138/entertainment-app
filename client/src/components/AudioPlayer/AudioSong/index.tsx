import { Menu } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { logout } from '../../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeFavourite } from '../../../redux/song/songActions';
import LoginRequired from '../../LoginRequired';
import SongItemMenu from '../../SongItemMenu';
import { Container } from './style';

interface Props {}

const AudioSong: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  // const [is_liked, setIsLiked] = useState<boolean>(
  //   Boolean(current_song?.is_liked)
  // );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLikeSong = async () => {
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

  // useEffect(() => {
  //   if (current_song) {
  //     setIsLiked(current_song.is_liked);
  //   }
  // }, [current_song]);

  // console.log({ current_song, is_liked });

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
      >
        <SongItemMenu
          song={current_song}
          closeSongItemAction={handleCloseSongMenu}
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
          <Link className='singer-name' to='/'>
            {current_song.singer_name}
          </Link>
        </div>

        <div className='song-actions'>
          <LoginRequired>
            <button onClick={handleClickLikeSong} className='action like-btn'>
              {current_song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </LoginRequired>

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
        </div>
      </Container>
    </>
  );
};

export default AudioSong;
