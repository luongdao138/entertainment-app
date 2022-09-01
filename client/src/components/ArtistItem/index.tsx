import React, { useState } from 'react';
import { Container } from './style';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsShuffle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ArtistItem = () => {
  const [is_followed, setIsFollowed] = useState<boolean>(false);

  return (
    <Container is_followed={is_followed}>
      <div className='artist-thumbnail'>
        <img
          src='https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/0/1/c/001c7c81cd5f1c1e53233967d42fd7aa.jpg'
          alt=''
        />

        <button className='action'>
          <BsShuffle />
        </button>

        <div className='opacity'></div>
      </div>

      <Link to='/' className='artist-name'>
        Mạch Tiểu Đâu
      </Link>
      <p className='follow-count'>36k quan tâm</p>
      <button className='artist-btn'>
        {is_followed ? (
          <BsShuffle style={{ fontSize: '1.2rem' }} />
        ) : (
          <AiOutlineUserAdd />
        )}
        <span>{is_followed ? 'Góc nhạc' : 'Quan tâm'}</span>
      </button>
    </Container>
  );
};

export default ArtistItem;
