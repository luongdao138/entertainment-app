import React from 'react';
import MySlider from '../../Slider';
import { Container } from './style';

const AudioSeekbar = () => {
  return (
    <Container>
      <span className='start-time time'>00:14</span>
      <div className='slider'>
        <MySlider />
      </div>
      <span className='end-time time'>03:34</span>
    </Container>
  );
};

export default AudioSeekbar;
