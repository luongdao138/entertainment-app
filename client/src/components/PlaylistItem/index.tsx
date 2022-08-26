import React from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { Container } from './style';
import { Link } from 'react-router-dom';

interface Props {}

const PlaylistItem: React.FC<Props> = () => {
  return (
    <Container>
      <Link to='/' className='thumbnail-container'>
        <img
          src='https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/covers/4/b/4b1c59c7728e2b1cb65f6cb20aaf5cf9_1499881926.jpg'
          alt=''
        />

        <div className='thumbnail-backdrop'></div>

        <div className='thumbnail-actions'>
          <button className='action'>
            <MdClose />
          </button>
          <button className='play-state'>
            <BsFillPlayFill />
          </button>
          <button className='action'>
            <MdMoreHoriz />
          </button>
        </div>
      </Link>

      <Link to='/' className='name'>Nhạc hoa hay nhất</Link>
      <p className='author'>Đào Văn Lương</p>
    </Container>
  );
};

export default PlaylistItem;
