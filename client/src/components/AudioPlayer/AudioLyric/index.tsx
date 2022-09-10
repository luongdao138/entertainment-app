import React from 'react';
import { Container } from './style';
import { TbMicrophone2 } from 'react-icons/tb';
import { useAppSelector } from '../../../redux/hooks';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';

const AudioLyric = () => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  return (
    <Container>
      <button
        className='karaoke-icon'
        disabled={!Boolean(current_song?.has_lyric)}
      >
        {/* <KaraokeIcon /> */}
        <TbMicrophone2 />
        {/* <img src={karaokeIcon} width={20} alt='' /> */}
      </button>
    </Container>
  );
};

export default AudioLyric;
