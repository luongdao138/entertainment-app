import React from 'react';
import { Audio } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const AudioPlayingIcon: React.FC<Props> = ({
  width = 25,
  height = 25,
  color = '#fff',
}) => {
  return (
    <Audio
      height={width}
      width={height}
      color={color}
      ariaLabel='audio-loading'
      wrapperStyle={{}}
      wrapperClass='wrapper-class'
      visible={true}
    />
  );
};

export default AudioPlayingIcon;
