import { Switch } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import QueueSongItem from './QueueSongItem';
import { Container } from './style';
import { v4 as uuid } from 'uuid';

const QueueContent = () => {
  return (
    <Container>
      <div className='archive-list'>
        {[...new Array(2)].map((_, index) => (
          <QueueSongItem
            key={index}
            song={{
              id: uuid(),
              created_at: new Date(),
              duration: 170,
              is_liked: false,
              name: 'Ngân hà và vì sao',
              singer_name: 'Tiểu lam bối tâm',
              thumbnail:
                'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
              updated_at: new Date(),
              url: '',
              belong_categories: [],
            }}
          />
        ))}
      </div>

      <div className='next-list'>
        <div className='next-list-header'>
          <h3>Tiếp theo</h3>
          <p>
            Từ playlist <Link to='/'>Nhạc Hoa Hay Nhất</Link>
          </p>
        </div>

        <div className='songs-list'>
          {[...new Array(10)].map((_, index) => (
            <QueueSongItem
              key={index}
              song={{
                id: uuid(),
                created_at: new Date(),
                duration: 170,
                is_liked: false,
                name: 'Ngân hà và vì sao',
                singer_name: 'Tiểu lam bối tâm',
                thumbnail:
                  'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
                updated_at: new Date(),
                url: '',
                belong_categories: [],
              }}
            />
          ))}
        </div>
      </div>

      <div className='recommend-list'>
        <div className='recommend-list-header'>
          <h3>Gợi ý</h3>
          <div className='right'>
            <span>Tự động phát</span>
            <Switch
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: '#fff',
                },
                '& .MuiSwitch-track ': {
                  backgroundColor: '#a0a0a0',
                },
                '& .Mui-checked + .MuiSwitch-track ': {
                  backgroundColor: '#7200a1 !important',
                },
              }}
            />

            <button className='reload-btn'>
              <HiOutlineRefresh />
            </button>
          </div>
        </div>
        {[...new Array(4)].map((_, index) => (
          <QueueSongItem
            key={index}
            song={{
              id: uuid(),
              created_at: new Date(),
              duration: 170,
              is_liked: false,
              name: 'Ngân hà và vì sao',
              singer_name: 'Tiểu lam bối tâm',
              thumbnail:
                'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
              updated_at: new Date(),
              url: '',
              belong_categories: [],
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default QueueContent;
