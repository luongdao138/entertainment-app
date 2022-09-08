import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAudioContext } from '../../../../context/AudioContext';
import {
  getAudioArchivedListSelector,
  getAudioCurrentListSongs,
  getAudioCurrentSongSelector,
} from '../../../../redux/audioPlayer/audioPlayerSelectors';
import { logout } from '../../../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { changeFavourite } from '../../../../redux/song/songActions';
import { Song } from '../../../../services/song';
import SongItemMenu from '../../../SongItemMenu';
import { Container } from './style';

interface Props {
  song: Song;
  is_dragging?: boolean;
  can_remove_out_of_queue?: boolean;
  onRemoveSongOutOfQueue?: (queue_id: string) => void;
}

const QueueSongItem: React.FC<Props> = ({
  song,
  can_remove_out_of_queue,
  onRemoveSongOutOfQueue,
  is_dragging,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const archive_list = useAppSelector(getAudioArchivedListSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const { handleClickQueueSong } = useAudioContext();

  const is_current_audio = song.is_current_audio;
  // audio_list_songs[current_audio_index]?.queue_id === song.queue_id;
  const is_archive = archive_list.some(
    (x) => x.queue_id === song.queue_id && !x.is_current_audio
  );

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

  const onClickQueueSong = () => {
    if (song.queue_id) handleClickQueueSong(song.queue_id);
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
        <SongItemMenu
          song={song}
          closeSongItemAction={handleCloseSongMenu}
          disable_add_to_play_next
          disable_add_to_player_queue
          can_remove_out_of_queue={can_remove_out_of_queue}
          onRemoveSongOutOfQueue={onRemoveSongOutOfQueue}
        />
      </Menu>
      <Container
        is_liked={song.is_liked}
        is_archive={is_archive}
        is_current_audio={is_current_audio}
        is_dragging={is_dragging}
      >
        <div className='song-left'>
          <div className='song-thumbnail' onClick={onClickQueueSong}>
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
