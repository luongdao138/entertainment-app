import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Container } from './style';

const SongItemSkeleton = () => {
  return (
    <Container>
      <div className='left-wrapper'>
        <div className='left'>
          <Skeleton className='thumbnail' />
          <div className='info'>
            <Skeleton className='name' />
            <Skeleton className='singer-name' />
          </div>
        </div>
      </div>
      <div className='right'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </Container>
  );
};

export default SongItemSkeleton;
