import React from 'react';
import { LyricContentTab } from '../../../layout/components/LyricModal';
import { Container } from './style';

interface Props {
  tab: LyricContentTab;
}

const LyricBottom: React.FC<Props> = ({ tab }) => {
  return (
    <Container>
      {tab === 'playlist' ? null : (
        <>
          Cô Phương Tự Thưởng / 孤芳自赏 - <span> Dương Tiểu Tráng</span>
        </>
      )}
    </Container>
  );
};

export default LyricBottom;
