import React, { useEffect, useState } from 'react';
import LyricBottom from '../../../components/LyricModal/LyricBottom';
import LyricContent from '../../../components/LyricModal/LyricContent';
import LyricHeader from '../../../components/LyricModal/LyricHeader';
import { useLyricContext } from '../../../context/LyricContext';
import useLockScreen from '../../../hooks/useLockScreen';
import { Container } from './style';
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from 'react-full-screen';

export type LyricContentTab = 'playlist' | 'karaoke' | 'lyric';

const LyricModal = () => {
  const { open_lyric } = useLyricContext();
  const [_, setLocked] = useLockScreen();
  const [isFullscreenMode, setIsFullScreenMode] = useState<boolean>(false);
  const [tab, setTab] = useState<LyricContentTab>('lyric');
  const handle = useFullScreenHandle();

  const changeLyricTab = (tab: LyricContentTab) => {
    setTab(tab);
  };

  const onChangeFullScreenMode = (state: boolean, handle: FullScreenHandle) => {
    // console.log({ state, handle });
    setIsFullScreenMode(state);
  };

  const enterFullscreenMode = () => {
    handle.enter().catch(() => {
      console.warn('Fullscreen mode not support');
    });
  };

  const exitFullscreenMode = () => {
    handle.exit().catch(() => {
      console.warn('Can not exit fullscreen mode');
    });
  };

  useEffect(() => {
    setLocked(open_lyric);
  }, [open_lyric]);

  return (
    <FullScreen handle={handle} onChange={onChangeFullScreenMode}>
      <Container open_lyric={open_lyric}>
        <div className='background-container'>
          <div
            className='blur-image'
            style={{
              backgroundImage:
                'url(https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/avatars/3/9/5/8/395804d8c74165e61c54d8d42343402e.jpg',
            }}
          ></div>
          <div className='overlay'></div>
        </div>

        <div className='lyric-content'>
          <LyricHeader
            enterFullscreenMode={enterFullscreenMode}
            exitFullscreenMode={exitFullscreenMode}
            isFullScreenMode={isFullscreenMode}
            tab={tab}
            changeTab={changeLyricTab}
          />
          <LyricContent tab={tab} />
          <LyricBottom tab={tab} />
        </div>
      </Container>
    </FullScreen>
  );
};

export default LyricModal;
