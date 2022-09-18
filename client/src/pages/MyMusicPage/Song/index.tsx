import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import appRoutes from '../../../constants/appRoutes';
import Helmet from 'react-helmet';

const Container = styled.div`
  & .tabs {
    margin-bottom: 3rem;
  }

  & .skeleton-container {
    display: grid;
    gap: 2.4rem;
    margin-top: 2rem;
  }
`;

interface Props {
  active: boolean;
}

const TagItem = styled(Link)`
  padding: 0.4rem 1rem;
  border-radius: 10rem;
  color: #fff;
  font-size: 1.2rem;
  border: ${(props: Props) =>
    props.active ? '1px solid transparent' : '1px solid #fff'};
  background-color: ${(props: { active?: boolean }) =>
    props.active ? '#7200a1' : 'transparent'};
  text-transform: uppercase;

  &:hover {
    border-color: #7200a1;
    color: ${(props: Props) => (!props.active ? '#7200a1' : '#fff')};
  }

  & + & {
    margin-left: 1.5rem;
  }
`;

const Song = () => {
  const location = useLocation();
  const isFavouriteTab =
    location.pathname === appRoutes.MYMUSIC ||
    location.pathname === appRoutes.MYMUSIC_SONG ||
    location.pathname === appRoutes.MYMUSIC_SONG_FAVORITE;

  return (
    <Container>
      <Helmet>
        <title>Nhạc cá nhân</title>
      </Helmet>
      <div className='tabs'>
        <TagItem active={isFavouriteTab} to={appRoutes.MYMUSIC_SONG_FAVORITE}>
          Yêu thích
        </TagItem>
        <TagItem active={!isFavouriteTab} to={appRoutes.MYMUSIC_SONG_UPLOAD}>
          Đã tải lên
        </TagItem>
      </div>

      <div>
        <Outlet />
      </div>
    </Container>
  );
};

export default Song;
