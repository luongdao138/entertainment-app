import React from 'react';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import {
  getAudioArchivedListSelector,
  getAudioMetaSelector,
  getAudioStateSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { changeAudioCurrentState } from '../../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Container } from './style';
import { RotatingLines } from 'react-loader-spinner';
import { disableClickEvent } from '../../../utils/common';
import { useAudioContext } from '../../../context/AudioContext';

const AudioAction = () => {
  const dispatch = useAppDispatch();
  const audio_state = useAppSelector(getAudioStateSelector);
  const audio_meta = useAppSelector(getAudioMetaSelector);
  const archive_list = useAppSelector(getAudioArchivedListSelector);
  const {
    handlePlayAudio,
    handlePauseAudio,
    handleMoveToNextSong,
    handleMoveToPrevSong,
  } = useAudioContext();

  // check xem bài hát đang phát có phải là bài hát đầu tiên hay ko, nếu có thì disable nút back
  const is_first_song = archive_list[0]?.is_current_audio;

  const handleClickShuffle = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    dispatch(
      changeAudioCurrentState({
        new_state: { is_shuffle: !audio_state.is_shuffle },
      })
    );
  };

  const handleClickPlayButton = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    if (audio_meta.is_audio_loading) return;

    if (audio_meta.is_audio_playing) {
      handlePauseAudio();
    } else {
      handlePlayAudio();
    }
  };

  const handleClickNextSong = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    handleMoveToNextSong();
  };

  const handleClickPrevSong = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    handleMoveToPrevSong();
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
      <button
        className='action-item'
        onClick={handleClickPrevSong}
        disabled={audio_meta.is_audio_error || is_first_song}
      >
        <BsFillSkipStartFill className='big-icon' />
      </button>

      {/* Play or pause song */}
      <button
        disabled={audio_meta.is_audio_error}
        className='play-state'
        onClick={handleClickPlayButton}
      >
        {audio_meta.is_audio_loading ? (
          <RotatingLines
            strokeColor='#ffffff'
            strokeWidth='5'
            animationDuration='0.75'
            width='15'
            visible={true}
          />
        ) : audio_meta.is_audio_playing ? (
          <BsPauseFill />
        ) : (
          <BsFillPlayFill className='icon' />
        )}
        {/* <BsPauseFill /> */}
        {/* <BsFillPlayFill /> */}
      </button>

      {/* G oto next song in playlist queue */}
      <button
        onClick={handleClickNextSong}
        className='action-item'
        disabled={audio_meta.is_audio_error}
      >
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
