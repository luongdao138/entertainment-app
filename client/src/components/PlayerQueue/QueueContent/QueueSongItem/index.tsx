import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import { logout } from '../../../../redux/auth/authSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { changeFavourite } from '../../../../redux/song/songActions';
import { Song } from '../../../../services/song';
import SongItemMenu from '../../../SongItemMenu';
import { Container } from './style';

interface Props {
  song: Song;
}

const QueueSongItem: React.FC<Props> = ({ song }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  const handleClickFavourite = async () => {
    try {
      const prev = song.is_liked;
      // setIsLiked((prev) => !prev);
      // await changeFavourite(song.id);
      dispatch(
        changeFavourite({
          data: song.id,
          onSuccess() {
            if (!prev) toast.success('Đã thêm bài hát vào thư viện');
            else toast.success('Đã xóa bài hát khỏi thư viện');
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
  };

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
        <SongItemMenu song={song} closeSongItemAction={handleCloseSongMenu} />
      </Menu>
      <Container is_liked={song.is_liked}>
        <div className='song-left'>
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
          <button className='favourite action' onClick={handleClickFavourite}>
            {song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button
            aria-label='more'
            id='song-item-button'
            aria-controls={openSongMenu ? 'song-item-menu' : undefined}
            aria-expanded={openSongMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleOpenSongMenu}
            className='more-btn action'
          >
            <MdMoreHoriz />
          </button>
        </div>
      </Container>
    </>
  );
};

export default QueueSongItem;
