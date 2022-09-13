import React, { useMemo } from 'react';
import { LyricContentTab } from '../../../layout/components/LyricModal';
import { Container } from './style';

interface Props {
  tab: LyricContentTab;
}

const LyricContent: React.FC<Props> = ({ tab }) => {
  const renderContent = useMemo(() => {
    switch (tab) {
      case 'lyric':
        return <h1>Lyric</h1>;
      case 'karaoke':
        return <h1>Karaoke</h1>;

      default:
        return <h1>Playlist</h1>;
    }
  }, [tab]);

  return <Container>{renderContent}</Container>;
};

export default LyricContent;
