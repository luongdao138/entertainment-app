import React from 'react';
import { Container } from './style';
import { TbMicrophone2 } from 'react-icons/tb';
import { useAppSelector } from '../../../redux/hooks';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { disableClickEvent } from '../../../utils/common';
import { useLyricContext } from '../../../context/LyricContext';
import MyTooltip from '../../Tooltip';

const AudioLyric = () => {
  const { handleOpenLyric } = useLyricContext();
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  if (!current_song) return null;

  const has_lyric = Boolean(current_song.lyric?.id);

  const handleClickLyricBtn = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    handleOpenLyric();
  };

  return (
    <Container>
      <MyTooltip
        placement='top'
        disabled={!Boolean(has_lyric)}
        title='Xem lời bài hát'
      >
        <button
          onClick={handleClickLyricBtn}
          className='karaoke-icon'
          disabled={!Boolean(has_lyric)}
        >
          <TbMicrophone2 />
        </button>
      </MyTooltip>
    </Container>
  );
};

export default AudioLyric;
