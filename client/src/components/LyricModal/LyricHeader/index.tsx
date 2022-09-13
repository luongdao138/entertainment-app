import React from 'react';
import { Container } from './style';
import { ReactComponent as ZingMP3Icon } from '../../../assets/zing-mp3-icon.svg';
import { BsChevronDown } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { useLyricContext } from '../../../context/LyricContext';
import { LyricContentTab } from '../../../layout/components/LyricModal';
import Tabs from '../../Tabs';
import { AiOutlineShrink } from 'react-icons/ai';

const tabOptions = [
  {
    label: 'Danh sách phát',
    value: 'playlist',
  },
  {
    label: 'Karaoke',
    value: 'karaoke',
  },
  {
    label: 'Lời bài hát',
    value: 'lyric',
  },
];

interface Props {
  tab: LyricContentTab;
  changeTab: (tab: LyricContentTab) => void;
  exitFullscreenMode: () => void;
  enterFullscreenMode: () => void;
  isFullScreenMode: boolean;
}

const LyricHeader: React.FC<Props> = ({
  changeTab,
  tab,
  enterFullscreenMode,
  exitFullscreenMode,
  isFullScreenMode,
}) => {
  const { handleCloseLyric } = useLyricContext();

  const onCloseLyric = () => {
    handleCloseLyric();
  };

  return (
    <Container>
      <ZingMP3Icon className='logo' />
      <Tabs
        value={tab}
        onChange={(value) => changeTab(value as LyricContentTab)}
        options={tabOptions}
        textColor='hsla(0, 0%, 100%, 0.5)'
        activeBackground='hsla(0,0%,100%,.1)'
      />

      <div className='lyric-header-actions'>
        <button
          onClick={isFullScreenMode ? exitFullscreenMode : enterFullscreenMode}
          className='action-btn'
        >
          {isFullScreenMode ? (
            <AiOutlineShrink style={{ fontSize: '2.5rem' }} />
          ) : (
            <CgArrowsExpandRight />
          )}
        </button>
        <button className='action-btn'>
          <FiSettings />
        </button>
        {!isFullScreenMode && (
          <button onClick={onCloseLyric} className='action-btn'>
            <BsChevronDown />
          </button>
        )}
      </div>
    </Container>
  );
};

export default LyricHeader;
