import React from 'react';
import {
  BsFillPlayFill,
  BsShuffle,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { Container } from './style';

const AudioAction = () => {
  return (
    <Container>
      {/* Shuffle songs */}
      <button className='action-item'>
        <BsShuffle />
      </button>

      {/* Go to previous song in queue */}
      <button className='action-item'>
        <BsFillSkipStartFill className='big-icon' />
      </button>

      {/* Play or pause song */}
      <button className='play-state'>
        <BsFillPlayFill />
      </button>

      {/* G oto next song in playlist queue */}
      <button className='action-item'>
        <BsFillSkipEndFill className='big-icon' />
      </button>

      {/* Replay all */}
      <button className='action-item'>
        <FiRepeat />
      </button>
    </Container>
  );
};

export default AudioAction;
