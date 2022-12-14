import React from 'react';
import { BsLink45Deg, BsMusicNoteList } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineBan } from 'react-icons/hi';
import { MdOutlineSkipNext, MdPlaylistAdd } from 'react-icons/md';
import { Song } from '../../services/song';
import AddToPlaylist from '../AddToPlaylist';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { Container } from './style';
import { FaRegComment } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import { AddSongToPlayerParams } from '../../context/AudioContext';
import { TbMicrophone2 } from 'react-icons/tb';
import MusicShare from '../MusicShare';
interface Props {
  song: Song;
  can_delete_song?: boolean;
  can_remove_out_of_list?: boolean;
  can_edit_song?: boolean;
  disable_add_to_player_queue?: boolean;
  disable_add_to_play_next?: boolean;
  can_play_with_lyric?: boolean;
  can_remove_out_of_queue?: boolean;
  handleOpenEditSongForm?: () => void;
  closeSongItemAction: () => void;
  changeSelectedSong?: (song: Song) => void;
  handleRemoveSongOutOfPlaylist?: (song_id: string) => void;
  handleOpenDeleteConfirmModal?: () => void;
  handleAddSongsToPlayerQueue?: (params: AddSongToPlayerParams) => void;
  handleAddSongToPlayNext?: (params: { song: AudioSong }) => void;
  onRemoveSongOutOfQueue?: (queue_id: string) => void;
  onAddSongsToPlayerQueue?: (song: AudioSong) => void;
  onAddSongsToPlayNext?: (song: AudioSong) => void;
}

const SongItemMenu: React.FC<Props> = ({
  song,
  can_delete_song,
  can_edit_song,
  can_remove_out_of_list,
  disable_add_to_play_next,
  disable_add_to_player_queue,
  can_remove_out_of_queue,
  can_play_with_lyric,
  handleOpenEditSongForm,
  closeSongItemAction,
  changeSelectedSong,
  handleRemoveSongOutOfPlaylist,
  handleOpenDeleteConfirmModal,
  onRemoveSongOutOfQueue,
  onAddSongsToPlayNext,
  onAddSongsToPlayerQueue,
}) => {
  const handleDownloadSong = () => {
    // fileSaver.saveAs(song.url);
  };

  const [_, copy] = useCopyToClipboard('Link ???? ???????c sao ch??p v??o clipboard');
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
    onAddSongsToPlayerQueue?.(song);
    closeSongItemAction();
  };

  const onAddSongToPlayNext = () => {
    onAddSongsToPlayNext?.(song);
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
          <span>T???i xu???ng</span>
        </button>
        <button>
          <BsMusicNoteList />
          <span>L???i b??i h??t</span>
        </button>
        <button>
          <HiOutlineBan />
          <span>Ch???n</span>
        </button>
      </div>

      <ul className='menu-list'>
        {!disable_add_to_player_queue && (
          <li onClick={handleAddToPlayerList}>
            <MdPlaylistAdd />
            <span>Th??m v??o danh s??ch ph??t</span>
          </li>
        )}
        {!disable_add_to_play_next && (
          <li onClick={onAddSongToPlayNext}>
            <MdOutlineSkipNext />
            <span>Ph??t ti???p theo</span>
          </li>
        )}
        <AddToPlaylist song_item={song} />

        {can_play_with_lyric && (
          <li>
            <TbMicrophone2 />
            <span>Ph??t c??ng l???i b??i h??t</span>
          </li>
        )}

        <li>
          <FaRegComment />
          <span>B??nh lu???n</span>
        </li>

        {song.user_id !== authUser?.id && (
          <li onClick={handleCopyLinkToClipboard}>
            <BsLink45Deg />
            <span>Sao ch??p link</span>
          </li>
        )}

        {can_edit_song && (
          <li onClick={handleClickEdit}>
            <MdOutlineModeEdit />
            <span>Ch???nh s???a</span>
          </li>
        )}
        {can_delete_song && (
          <li onClick={handleClickDeleteSong}>
            <MdOutlineDeleteOutline />
            <span>X??a</span>
          </li>
        )}
        {can_remove_out_of_list && (
          <li onClick={() => handleRemoveSongOutOfPlaylist?.(song.id)}>
            <MdOutlineDeleteOutline />
            <span>X??a kh???i playlist n??y</span>
          </li>
        )}

        {can_remove_out_of_queue && (
          <li onClick={handleRemoveSongOutOfPlayerQueue}>
            <MdOutlineDeleteOutline />
            <span>X??a</span>
          </li>
        )}

        <MusicShare is_song={true} id={song.id} />
      </ul>
    </Container>
  );
};

export default SongItemMenu;
