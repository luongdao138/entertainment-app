import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { getAudioCurrentListSongs } from '../../../../redux/audioPlayer/audioPlayerSelectors';
import { resetAudioPlayer } from '../../../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import AddToPlaylist from '../../../AddToPlaylist';
import { Container } from './style';

interface Props {
  closeQueue: () => void;
  closeMenu: () => void;
}

const QueueMenu: React.FC<Props> = ({ closeMenu, closeQueue }) => {
  const dispatch = useAppDispatch();

  const handleRemovePlayer = () => {
    dispatch(resetAudioPlayer());
    closeMenu();
    closeQueue();
  };

  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);

  return (
    <Container>
      <li onClick={handleRemovePlayer}>
        <MdOutlineDeleteOutline />
        <span>Xóa danh sách phát</span>
      </li>
      <li>
        <FiDownload />
        <span>Tải danh sách phát</span>
      </li>
      <AddToPlaylist song_item={audio_list_songs} />
    </Container>
  );
};

export default QueueMenu;
