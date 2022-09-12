import React, { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import QueueContent from '../../../components/PlayerQueue/QueueContent';
import PlayerQueueHeader from '../../../components/PlayerQueue/QueueHeader';
import { useAudioContext } from '../../../context/AudioContext';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { useAppSelector } from '../../../redux/hooks';
import { Container } from './style';

const PlayerQueue = () => {
  const { openQueue, openPlayer, playerRef, handleCloseQueue } =
    useAudioContext();
  const [openAlarm, setOpenAlarm] = useState<boolean>(false);

  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const handleClickAwayPlayerQueue = (e: MouseEvent | TouchEvent) => {
    if (!playerRef.current?.contains(e.target as Node | null)) {
      // handleCloseQueue();
    }
  };

  const openAlarmModal = () => {
    setOpenAlarm(true);
  };

  const closeAlarmModal = () => {
    setOpenAlarm(false);
  };

  // phải có audio player và bài hát rồi mới có queue
  if (!current_song) return null;

  return (
    <ClickAwayListener onClickAway={handleClickAwayPlayerQueue}>
      <Container openQueue={openQueue}>
        <div className='queue-header'>
          <PlayerQueueHeader />
        </div>
        <div className='queue-content'>
          <QueueContent />
        </div>
      </Container>
    </ClickAwayListener>
  );
};

export default PlayerQueue;
