import React from 'react';
import { BsMusicNoteList } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineBan } from 'react-icons/hi';
import { MdOutlineSkipNext } from 'react-icons/md';
import { toast } from 'react-toastify';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { addSongToPlaylist } from '../../services/playlist';
import { Song } from '../../services/song';
import AddToPlaylist from '../AddToPlaylist';
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdPlaylistAdd,
} from 'react-icons/md';
import { Container } from './style';

interface Props {
  song: Song;
  can_delete_song?: boolean;
  can_edit_song?: boolean;
  handleOpenEditSongForm?: () => void;
  closeSongItemAction: () => void;
}

const SongItemMenu: React.FC<Props> = ({
  song,
  can_delete_song,
  can_edit_song,
  handleOpenEditSongForm,
  closeSongItemAction,
}) => {
  const dispatch = useAppDispatch();
  const handleDownloadSong = () => {
    // fileSaver.saveAs(song.url);
  };

  const handleAddSongToPlaylist = async (playlist_id: string) => {
    try {
      await addSongToPlaylist({ playlist_id, song_id: song.id });
      toast.success(`Đã thêm bài hát "${song.name}" vào playlist thành công`);
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleClickEdit = () => {
    handleOpenEditSongForm?.();
    closeSongItemAction();
  };

  return (
    <Container>
      <div className='menu-info'>
        <img src={song.thumbnail} alt='' />
        <div className='menu-name'>
          <h4>{song.name}</h4>
          <p>{song.singer_name}</p>
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
        <AddToPlaylist onAddToPlaylist={handleAddSongToPlaylist} />
        {can_edit_song && (
          <li onClick={handleClickEdit}>
            <MdOutlineModeEdit />
            <span>Chỉnh sửa</span>
          </li>
        )}
        {can_delete_song && (
          <li>
            <MdOutlineDeleteOutline />
            <span>Xóa</span>
          </li>
        )}
      </ul>
    </Container>
  );
};

export default SongItemMenu;
