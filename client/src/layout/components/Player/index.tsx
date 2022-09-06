import React, { useEffect } from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import AudioAction from '../../../components/AudioPlayer/AudioAction';
import AudioSeekbar from '../../../components/AudioPlayer/AudioSeekbar';
import AudioSong from '../../../components/AudioPlayer/AudioSong';
import AudioVolume from '../../../components/AudioPlayer/AudioVolume';
import { Container } from './style';
import { v4 as uuid } from 'uuid';
import AudioPlayer from '../../../components/AudioPlayer';
import { useAudioContext } from '../../../context/AudioContext';

const Player = () => {
  const { handleToggleQueue, openQueue, playerRef } = useAudioContext();

  return (
    <Container openQueue={openQueue} ref={playerRef}>
      <div className='player-content'>
        <div className='player-left'>
          <AudioSong />
        </div>
        <div className='player-middle'>
          <AudioAction />
          <AudioSeekbar />
          <AudioPlayer />
        </div>
        <div className='player-right'>
          <AudioVolume />
          <div className='divider'></div>
          <div className='queue'>
            <button onClick={handleToggleQueue}>
              <MdOutlineQueueMusic />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Player;
