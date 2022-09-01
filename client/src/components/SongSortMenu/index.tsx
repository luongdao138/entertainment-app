import React from 'react';
import { Container } from './style';

interface Props {
  value: string;
  changeValue: (value: string) => void;
}

const SongSortMenu: React.FC<Props> = ({ value, changeValue }) => {
  return (
    <Container>
      <ul>
        <li>Mặc định</li>
        <li>Tên bài hát (A-Z)</li>
        <li>Tên bài hát (Z-A)</li>
      </ul>
    </Container>
  );
};

export default SongSortMenu;
