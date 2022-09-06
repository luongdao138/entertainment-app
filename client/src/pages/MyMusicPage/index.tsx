import { MdAdd } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PlaylistItem from '../../components/PlaylistItem';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPrivatePlaylists } from '../../redux/playlist/playlistActions';
import { getLibraryPlaylist } from '../../redux/playlist/playlistSelector';
import appRoutes from '../../constants/appRoutes';
import { Container, NavigationItem } from './style';
import { toast } from 'react-toastify';

const MyMusicPage = () => {
  const location = useLocation();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();
  // const isFirstRenderRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const library_playlists = useAppSelector(getLibraryPlaylist);
  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    dispatch(getPrivatePlaylists({ is_own: false }));
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
          {library_playlists.slice(0, 5).map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
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
