import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { changeFavourite, Song } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/auth/authSlice';
import { addSongToPlaylist } from '../../services/playlist';
import { addSongToPlaylistSuccess } from '../../redux/playlistDetail/playlistDetailSlice';

interface Props {
  song: Song;
  playlist_id: string;
}

const RecommendPlaylistSongItem: React.FC<Props> = ({ song, playlist_id }) => {
  const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const dispatch = useAppDispatch();

  const handleClickFavourite = async () => {
    try {
      const prev = is_liked;
      setIsLiked((prev) => !prev);
      await changeFavourite(song.id);
      if (!prev) toast.success('Đã thêm bài hát vào thư viện');
      else toast.success('Đã xóa bài hát khỏi thư viện');
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleAddSongToPlaylist = async () => {
    try {
      await addSongToPlaylist({ song_id: song.id, playlist_id });
      toast.success(`Đã thêm bài hát "${song.name}" vào playlist thành công`);
      dispatch(addSongToPlaylistSuccess({ song }));
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    setIsLiked(song.is_liked);
  }, [song.is_liked]);

  return (
    <Container is_liked={is_liked}>
      <div className='song-left'>
        <div className='music-icon'>
          <FiMusic />
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
        <div className='song-menu-wrapper' onClick={handleAddSongToPlaylist}>
          <button className='more-action'>
            <MdAdd />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default RecommendPlaylistSongItem;
