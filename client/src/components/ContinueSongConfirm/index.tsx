import React from 'react';
import { getAudioCurrentSongSelector } from '../../redux/audioPlayer/audioPlayerSelectors';
import { useAppSelector } from '../../redux/hooks';
import { disableClickEvent } from '../../utils/common';
import { Container } from './style';

interface Props {
  onCloseConfirmModal: () => void;
  onContinuePlay: () => void;
}

const ContinueSongConfirm: React.FC<Props> = ({
  onCloseConfirmModal,
  onContinuePlay,
}) => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const handleClickContinue = () => {
    onContinuePlay();
    onCloseConfirmModal();
  };

  if (!current_song) return null;
  return (
    <Container onClick={disableClickEvent}>
      <h4 className='title'>
        Thời gian phát nhạc đã kết thúc, bạn có muốn tiếp tục phát bài hát này?
      </h4>
      <div className='song-info'>
        <img src={current_song.thumbnail} alt='' />
        <p className='name'>{current_song.name}</p>
        <p className='singer-name'>{current_song.singer_name}</p>
      </div>
      <button className='btn save-btn' onClick={handleClickContinue}>
        Tiếp tục phát
      </button>
      <button className='btn cancel-btn' onClick={onCloseConfirmModal}>
        Bỏ qua
      </button>
    </Container>
  );
};

export default ContinueSongConfirm;
