import React from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdPlaylistAdd,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAudioContext } from '../../context/AudioContext';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { getAllSongsOfPlaylist, Playlist } from '../../services/playlist';
import { Container } from './style';

interface Props {
  playlist: Playlist;
  can_edit: boolean;
  can_delete: boolean;
  onOpenEditForm?: () => void;
  closePlaylistItemMenu: () => void;
  onOpenDeleteConfirmModal?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PlaylistItemMenu: React.FC<Props> = ({
  can_delete,
  can_edit,
  playlist,
  onOpenEditForm,
  closePlaylistItemMenu,
  onOpenDeleteConfirmModal,
}) => {
  const dispatch = useAppDispatch();
  const [_, copyLink] = useCopyToClipboard(
    'Link đã được sao chép vào clipboard'
  );
  const { handleAddSongsToPlayerQueue } = useAudioContext();

  const handleCopyLinkToClipboard = () => {
    copyLink(`${import.meta.env.VITE_CLIENT_URL}/playlist/${playlist.id}`);
    closePlaylistItemMenu();
  };

  const handleAddSongsToPlayerList = async () => {
    try {
      // gọi API để lấy ra tất cả các bài hát của playlist này
      const data = await getAllSongsOfPlaylist({ playlist_id: playlist.id });
      const new_songs = data.songs;
      handleAddSongsToPlayerQueue({
        playlist,
        songs: new_songs,
      });
      closePlaylistItemMenu();
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
      <Container>
        <ul className='list'>
          <li onClick={handleAddSongsToPlayerList}>
            <MdPlaylistAdd />
            <span>Thêm vào danh sách phát</span>
          </li>
          <li>
            <FaRegComment />
            <span>Bình luận</span>
          </li>
          <li>
            <FiDownload />
            <span>Tải xuống</span>
          </li>
          <li onClick={handleCopyLinkToClipboard}>
            <BsLink45Deg />
            <span>Sao chép link</span>
          </li>
          {can_edit && (
            <li onClick={onOpenEditForm}>
              <MdOutlineModeEdit />
              <span>Chỉnh sửa playlist</span>
            </li>
          )}
          {can_delete && (
            <li onClick={onOpenDeleteConfirmModal}>
              <MdOutlineDeleteOutline />
              <span>Xóa playlist</span>
            </li>
          )}
        </ul>
      </Container>
    </>
  );
};

export default PlaylistItemMenu;
