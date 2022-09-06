import React from 'react';
import {
  BsFillPlayFill,
  BsShuffle,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { getAudioStateSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { changeAudioCurrentState } from '../../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Container } from './style';

const AudioAction = () => {
  const dispatch = useAppDispatch();
  const audio_state = useAppSelector(getAudioStateSelector);
  const handleClickShuffle = () => {
    dispatch(
      changeAudioCurrentState({
        new_state: { is_shuffle: !audio_state.is_shuffle },
      })
    );
  };

  return (
    <Container>
      {/* Shuffle songs */}
      <button
        style={{ color: audio_state.is_shuffle ? '#c662ef' : '#fff' }}
        className='action-item'
        onClick={handleClickShuffle}
      >
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
