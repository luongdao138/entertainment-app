import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import AddToPlaylist from '../../../AddToPlaylist';
import { Container } from './style';

const QueueMenu = () => {
  return (
    <Container>
      <li>
        <MdOutlineDeleteOutline />
        <span>Xóa danh sách phát</span>
      </li>
      <li>
        <FiDownload />
        <span>Tải danh sách phát</span>
      </li>
      <AddToPlaylist song_item={[]} />
    </Container>
  );
};

export default QueueMenu;
