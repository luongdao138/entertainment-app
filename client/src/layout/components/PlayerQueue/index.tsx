import { ClickAwayListener } from '@mui/material';
import React from 'react';
import QueueContent from '../../../components/PlayerQueue/QueueContent';
import PlayerQueueHeader from '../../../components/PlayerQueue/QueueHeader';
import { useAudioContext } from '../../../context/AudioContext';
import { Container } from './style';

const PlayerQueue = () => {
  const { openQueue, playerRef, handleCloseQueue } = useAudioContext();

  const handleClickAwayPlayerQueue = (e: MouseEvent | TouchEvent) => {
    if (!playerRef.current?.contains(e.target as Node | null)) {
      handleCloseQueue();
    }
  };

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
