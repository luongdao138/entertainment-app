import React from 'react';
import { BsLink45Deg, BsMusicNoteList } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineBan } from 'react-icons/hi';
import { MdOutlineSkipNext, MdPlaylistAdd } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Song } from '../../services/song';
import AddToPlaylist from '../AddToPlaylist';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { Container } from './style';
import { FaRegComment } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import { getAudioCurrentSongSelector } from '../../redux/audioPlayer/audioPlayerSelectors';
import { AddSongToPlayerParams } from '../../context/AudioContext';

interface Props {
  song: Song;
  can_delete_song?: boolean;
  can_remove_out_of_list?: boolean;
  can_edit_song?: boolean;
  handleOpenEditSongForm?: () => void;
  closeSongItemAction: () => void;
  changeSelectedSong?: (song: Song) => void;
  handleRemoveSongOutOfPlaylist?: (song_id: string) => void;
  handleOpenDeleteConfirmModal?: () => void;
  handleAddSongsToPlayerQueue?: (params: AddSongToPlayerParams) => void;
  handleAddSongToPlayNext?: (params: { song: AudioSong }) => void;
  disable_add_to_player_queue?: boolean;
  disable_add_to_play_next?: boolean;
  can_remove_out_of_queue?: boolean;
  onRemoveSongOutOfQueue?: (queue_id: string) => void;
}

const SongItemMenu: React.FC<Props> = ({
  song,
  can_delete_song,
  can_edit_song,
  can_remove_out_of_list,
  handleOpenEditSongForm,
  closeSongItemAction,
  changeSelectedSong,
  handleRemoveSongOutOfPlaylist,
  handleOpenDeleteConfirmModal,
  handleAddSongToPlayNext,
  handleAddSongsToPlayerQueue,
  disable_add_to_play_next,
  disable_add_to_player_queue,
  can_remove_out_of_queue,
  onRemoveSongOutOfQueue,
}) => {
  const dispatch = useAppDispatch();
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const handleDownloadSong = () => {
    // fileSaver.saveAs(song.url);
  };

  const [_, copy] = useCopyToClipboard('Link đã được sao chép vào clipboard');
  const { authUser } = useAuthContext();

  const handleCopyLinkToClipboard = () => {
    copy(`${import.meta.env.VITE_CLIENT_URL}/song/${song.id}`);
    closeSongItemAction();
  };

  const handleClickEdit = () => {
    handleOpenEditSongForm?.();
    changeSelectedSong?.(song);
    closeSongItemAction();
  };

  const handleClickDeleteSong = () => {
    handleOpenDeleteConfirmModal?.();
    changeSelectedSong?.(song);
    closeSongItemAction();
  };

  const handleAddToPlayerList = () => {
    handleAddSongsToPlayerQueue?.({
      playlist: null,
      songs: [song],
    });
    closeSongItemAction();
  };

  const onAddSongToPlayNext = () => {
    handleAddSongToPlayNext?.({ song });
    closeSongItemAction();
  };

  const handleRemoveSongOutOfPlayerQueue = () => {
    if (song.queue_id) {
      onRemoveSongOutOfQueue?.(song.queue_id);
    }
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
        {!disable_add_to_player_queue && (
          <li onClick={handleAddToPlayerList}>
            <MdPlaylistAdd />
            <span>Thêm vào danh sách phát</span>
          </li>
        )}
        {!disable_add_to_play_next && (
          <li onClick={onAddSongToPlayNext}>
            <MdOutlineSkipNext />
            <span>Phát tiếp theo</span>
          </li>
        )}
        <AddToPlaylist song_item={song} />

        <li>
          <FaRegComment />
          <span>Bình luận</span>
        </li>

        {song.user_id !== authUser?.id && (
          <li onClick={handleCopyLinkToClipboard}>
            <BsLink45Deg />
            <span>Sao chép link</span>
          </li>
        )}

        {can_edit_song && (
          <li onClick={handleClickEdit}>
            <MdOutlineModeEdit />
            <span>Chỉnh sửa</span>
          </li>
        )}
        {can_delete_song && (
          <li onClick={handleClickDeleteSong}>
            <MdOutlineDeleteOutline />
            <span>Xóa</span>
          </li>
        )}
        {can_remove_out_of_list && (
          <li onClick={() => handleRemoveSongOutOfPlaylist?.(song.id)}>
            <MdOutlineDeleteOutline />
            <span>Xóa khỏi playlist này</span>
          </li>
        )}

        {can_remove_out_of_queue && (
          <li onClick={handleRemoveSongOutOfPlayerQueue}>
            <MdOutlineDeleteOutline />
            <span>Xóa</span>
          </li>
        )}
      </ul>
    </Container>
  );
};

export default SongItemMenu;
