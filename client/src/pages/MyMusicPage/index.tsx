import { MdAdd } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PlaylistItem from '../../components/PlaylistItem';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changePlaylistFavourite,
  getPrivatePlaylists,
} from '../../redux/playlist/playlistActions';
import { getLibraryPlaylist } from '../../redux/playlist/playlistSelector';
import appRoutes from '../../constants/appRoutes';

const Container = styled.div`
  padding-top: 7rem;

  & .title {
    font-size: 4rem;
    color: #fff;
    font-weight: 700;
    line-height: 4.8rem;
    margin-bottom: 3rem;
  }

  & .playlist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    & .playlist__header__left {
      display: flex;
      align-items: center;
    }

    & .playlist__header__left button {
      width: 2.6rem;
      aspect-ratio: 1;
      border-radius: 100%;
      display: grid;
      place-items: center;
      color: #fff;
      background-color: hsla(0, 0%, 100%, 0.1);

      & svg {
        font-size: 2rem;
      }
    }

    & .playlist__header__left span:first-child {
      font-weight: 700;
      font-size: 2rem;
      line-height: 3rem;
      color: #fff;
      margin-right: 0.75rem;
    }

    & .playlist__header__right {
      display: flex;
      align-items: center;
      color: hsla(0, 0%, 100%, 0.5);
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: uppercase;

      &:hover {
        color: #c662ef;
      }

      & span {
        margin-right: 0.5rem;
      }
      & svg {
        font-size: 1.6rem;
      }
    }
  }

  & .playlist__list {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 768px) {
    & .playlist__list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1224px) {
    & .playlist__list {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (min-width: 1496px) {
    & .playlist__list {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  & .navigation {
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: flex;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    min-height: 5rem;

    & li + li {
      margin-left: 4rem;
    }
  }
`;

const NavigationItem = styled.li`
  position: relative;
  & a {
    display: flex;
    color: #dadada;
    height: 100%;
    text-transform: uppercase;
    font-size: 1.4rem;
    align-items: center;

    &:hover {
      color: #fff;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: ${(props: { active?: boolean }) =>
      props.active ? `2px solid rgb(114, 0, 161)` : '2px solid transparent'};
  }
`;

const MyMusicPage = () => {
  const location = useLocation();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();
  const isFirstRenderRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const library_playlists = useAppSelector(getLibraryPlaylist);

  const handleChangeFavouritePlaylist = (id: string) => {
    dispatch(changePlaylistFavourite({ id }));
  };

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    dispatch(getPrivatePlaylists({ limit: 5, page: 1 }));
  }, []);

  return (
    <Container>
      <h2 className='title'>Thư viện</h2>
      <div className='playlist'>
        <div className='playlist__header'>
          <div className='playlist__header__left'>
            <span>Playlist</span>
            <button onClick={openUploadPlaylistForm}>
              <MdAdd />
            </button>
          </div>
          <Link
            to={appRoutes.LIBRARY_PLAYLIST}
            className='playlist__header__right'
          >
            <span>Tất cả</span>
            <BsChevronRight />
          </Link>
        </div>

        <div className='playlist__list'>
          {library_playlists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              onDeletePlaylistSuccess={() => {
                dispatch(getPrivatePlaylists({ page: 1, limit: 5 }));
              }}
              onClickLikePlaylist={() =>
                handleChangeFavouritePlaylist(playlist.id)
              }
              showChangeFavouriteConfirmModal
            />
          ))}
        </div>
      </div>

      <ul className='navigation'>
        <NavigationItem
          active={
            location.pathname === '/mymusic' ||
            location.pathname.includes('/mymusic/song')
          }
        >
          <Link to='/mymusic/song'>Bài hát</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to='/'>Postcast</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to='/'>Album</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to='/'>MV</Link>
        </NavigationItem>
      </ul>

      <div className='mymusic-main' style={{ paddingBottom: '3rem' }}>
        <Outlet />
      </div>
    </Container>
  );
};

export default MyMusicPage;
