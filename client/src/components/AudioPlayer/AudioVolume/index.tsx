import React from 'react';
import { Container } from './style';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import MySlider from '../../Slider';

const AudioVolume = () => {
  return (
    <Container>
      <button className='action-item'>
        <BsVolumeUp />
      </button>

      <div className='slider'>
        <MySlider />
      </div>
    </Container>
  );
};

export default AudioVolume;
