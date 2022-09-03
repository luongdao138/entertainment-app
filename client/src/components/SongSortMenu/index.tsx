import React from 'react';
import { SortType } from '../SongList';
import { Container, Item } from './style';

interface Props {
  value: SortType;
  changeValue: (value: SortType) => void;
}

const sortOptions: { label: string; value: SortType }[] = [
  {
    label: 'Mặc định',
    value: 'default',
  },
  {
    label: 'Tên bài hát (A-Z)',
    value: 'name_az',
  },
  {
    label: 'Tên bài hát (Z-A)',
    value: 'name_za',
  },
];

const SongSortMenu: React.FC<Props> = ({ value, changeValue }) => {
  return (
    <Container>
      <ul>
        {sortOptions.map((so) => (
          <Item
            active={value === so.value}
            onClick={() => changeValue(so.value)}
          >
            {so.label}
          </Item>
        ))}
      </ul>
    </Container>
  );
};

export default SongSortMenu;
