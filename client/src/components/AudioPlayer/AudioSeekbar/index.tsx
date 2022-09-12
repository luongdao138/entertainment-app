import React, { useEffect, useState } from 'react';
import { useAudioContext } from '../../../context/AudioContext';
import {
  getAudioMetaSelector,
  getAudioStateSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { useAppSelector } from '../../../redux/hooks';
import { disableClickEvent } from '../../../utils/common';
import { formatSongDuration } from '../../../utils/formatTime';
import MySlider from '../../Slider';
import { Container } from './style';

const AudioSeekbar = () => {
  const [current_time, setCurrentTime] = useState<number>(0);

  const { duration } = useAppSelector(getAudioStateSelector);
  const { is_audio_loaded } = useAppSelector(getAudioMetaSelector);
  const { audioRef } = useAudioContext();
  const [isTimePlayed, setIsTimePlayed] = useState<boolean>(true);
  const [temp_current_time, setTempCurrentTime] = useState<number | null>(null);

  const rendered_current_time = temp_current_time ?? current_time;

  // chỉ thay đổi thời gian thực của video khi người dùng thực sự thay đổi current_time (đã thả chuột ra)
  const handleOnChangeCommitted = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (audioRef.current) {
      const new_value = !Array.isArray(value) ? value : value[0];

      const new_current_time = (new_value * duration) / 100;
      // handleChangeAudioCurrentTime(new_current_time, true);
      setCurrentTime(new_current_time);
      audioRef.current.currentTime = new_current_time;
      setTempCurrentTime(null);
    }
  };

  // thay đổi current time trên UI nhưng chưa thay đổi current time của video (khi người dùng đang rê chuột)
  const handleOnChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    const new_value = !Array.isArray(value) ? value : value[0];

    const new_current_time = (new_value * duration) / 100;
    setTempCurrentTime(new_current_time);
  };

  const handleToggleTime = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    setIsTimePlayed((prev) => !prev);
  };

  const getRenderCurrentTime = (() => {
    if (isTimePlayed) return formatSongDuration(rendered_current_time);
    else return `-${formatSongDuration(duration - rendered_current_time)}`;
  })();

  useEffect(() => {
    const handleAudioTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    audioRef.current?.addEventListener('timeupdate', handleAudioTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener(
        'timeupdate',
        handleAudioTimeUpdate
      );
    };
  }, []);

  return (
    <Container>
      <span className='start-time time' onClick={handleToggleTime}>
        {getRenderCurrentTime}
      </span>
      <div className='slider'>
        <MySlider
          max={100}
          min={0}
          step={0.1}
          value={duration > 0 ? (rendered_current_time * 100) / duration : 0}
          onChangeCommitted={handleOnChangeCommitted}
          onChange={handleOnChange}
          // onChangeCapture
        />
      </div>
      <span className='end-time time' onClick={disableClickEvent}>
        {formatSongDuration(
          // !is_audio_loading && is_audio_loaded ? duration : 0
          is_audio_loaded ? duration : 0
        )}
      </span>
    </Container>
  );
};

export default AudioSeekbar;
