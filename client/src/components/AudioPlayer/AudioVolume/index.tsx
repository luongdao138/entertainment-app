import React, { useRef } from 'react';
import { Container } from './style';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import MySlider from '../../Slider';
import { useAppSelector } from '../../../redux/hooks';
import { getAudioVolumeSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { disableClickEvent } from '../../../utils/common';
import { useAudioContext } from '../../../context/AudioContext';

const AudioVolume = () => {
  const audio_volume = useAppSelector(getAudioVolumeSelector);
  const prev_volume_ref = useRef<number>(audio_volume);
  const { handleChangeAudioVolume } = useAudioContext();

  const handleClickMute = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);

    if (audio_volume > 0) {
      prev_volume_ref.current = audio_volume;
      handleChangeAudioVolume(0);
    } else {
      handleChangeAudioVolume(prev_volume_ref.current);
    }
  };

  const onVolumeChange = (event: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      handleChangeAudioVolume(value);
    }
  };

  return (
    <Container>
      <button className='action-item' onClick={handleClickMute}>
        {audio_volume === 0 ? <BsVolumeMute /> : <BsVolumeUp />}
      </button>

      <div className='slider'>
        <MySlider
          max={1}
          min={0}
          value={audio_volume}
          onChange={onVolumeChange}
          step={0.1}
        />
      </div>
    </Container>
  );
};

export default AudioVolume;
