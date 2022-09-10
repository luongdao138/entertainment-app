import React from 'react';
import { sortOptions, SortType } from '../../constants/options';
import { Container, Item } from './style';

interface Props {
  value: SortType;
  changeValue: (value: SortType) => void;
}

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
