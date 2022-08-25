import React from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { Container } from './style';

interface Props {}

const PlaylistItem: React.FC<Props> = () => {
  return (
    <Container>
      <div className='thumbnail-container'>
        <img
          src='https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1499881926.jpg'
          alt=''
        />

        <div className='thumbnail-actions'>
          <div className='action'>
            <MdClose />
          </div>
          <div className='play-state'>
            <BsFillPlayFill />
          </div>
          <div className='action'>
            <MdMoreHoriz />
          </div>
        </div>
      </div>

      <h3 className='name'>Nhạc hoa hay nhất</h3>
      <p className='author'>Đào Văn Lương</p>
    </Container>
  );
};

export default PlaylistItem;
