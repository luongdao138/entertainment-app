import { Slider, SliderProps } from '@mui/material';
import React from 'react';
import { disableClickEvent } from '../../utils/common';
import { sliderStyle } from './style';

type Props = SliderProps;

const MySlider: React.FC<SliderProps> = (props) => {
  const handleSliderClick = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
  };

  return <Slider onClick={handleSliderClick} sx={sliderStyle} {...props} />;
};

export default MySlider;
