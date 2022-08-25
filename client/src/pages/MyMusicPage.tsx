import React from 'react';
import { MdAdd } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem';

const Container = styled.div`
  padding-top: 7rem;
`;

const MyMusicPage = () => {
  return (
    <Container>
      <h2 className='title'>Thư viện</h2>
      <div className='playlist'>
        <div className='playlist__header'>
          <div className='playlist__header__left'>
            <span>Playlist</span>
            <span>
              <MdAdd />
            </span>
          </div>
          <Link to='/' className='playlist__header__right'>
            <span>Tất cả</span>
            <BsChevronRight />
          </Link>
        </div>

        <div className='playlist__list'>
          {[...new Array(5)].map((_, index) => (
            <PlaylistItem key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MyMusicPage;
