import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Divider, Logo, Menu, MenuItem } from './style';
import { MdAdd, MdOutlineLibraryMusic, MdOutlineHome } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChart, BiCategoryAlt } from 'react-icons/bi';
import LoginRequired from '../../../components/LoginRequired';
import appRoutes from '../../../constants/appRoutes';
import { useAuthContext } from '../../../context/AuthContext';
import { useUploadPlaylistContext } from '../../../context/UploadPlaylistContext';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getPrivatePlaylists } from '../../../redux/playlist/playlistActions';
import { getPrivatePlaylist } from '../../../redux/playlist/playlistSelector';
import PlaylistItem from '../../../components/PlaylistItem';
import { ReactComponent as SongIcon } from '../../../assets/song-icon.svg';
import { ReactComponent as PlaylistIcon } from '../../../assets/playlist-icon.svg';
import { ReactComponent as RecentIcon } from '../../../assets/recent-icon.svg';
import { useAudioContext } from '../../../context/AudioContext';

const Sidebar = () => {
  const { authUser, openAuthModal } = useAuthContext();
  const location = useLocation();
  const { openPlayer } = useAudioContext();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();
  const dispatch = useAppDispatch();
  // const isFirstRenderRef = useRef<boolean>(true);
  const private_playlists = useAppSelector(getPrivatePlaylist);

  const handleGetPlaylists = () => {
    dispatch(
      getPrivatePlaylists({
        is_own: true,
      })
    );
  };

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }
    if (authUser) {
      handleGetPlaylists();
    }
  }, [authUser]);

  return (
    <Container openPlayer={openPlayer}>
      <div className='sidebar-top'>
        <Logo>
          <Link to='/'>
            <img
              src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
              alt=''
            />
          </Link>
        </Logo>

        <Menu>
          <MenuItem active={location.pathname.includes(appRoutes.MYMUSIC)}>
            <LoginRequired>
              <Link to={appRoutes.MYMUSIC}>
                <MdOutlineLibraryMusic />
                <span>Cá nhân</span>

                <span className='music'>
                  <BsFillPlayFill />
                </span>
              </Link>
            </LoginRequired>
          </MenuItem>
          <MenuItem active={location.pathname === appRoutes.HOME}>
            <Link to={appRoutes.HOME}>
              <MdOutlineHome />
              <span>Khám phá</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/'>
              <BiChart />
              <span>#zingchart</span>

              <span className='music'>
                <BsFillPlayFill />
              </span>
            </Link>
          </MenuItem>
        </Menu>

        <Divider />

        <div className='sidebar-scroll'>
          <Menu>
            <MenuItem>
              <Link to='/'>
                <MdOutlineLibraryMusic />
                <span>Nhạc mới</span>

                <span className='music'>
                  <BsFillPlayFill />
                </span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to='/'>
                <BiCategoryAlt />
                <span>Thể loại</span>

                <span className='music'>
                  <BsFillPlayFill />
                </span>
              </Link>
            </MenuItem>
          </Menu>

          {authUser ? (
            <Menu>
              <h2>Thư viện</h2>
              <MenuItem>
                <Link to={appRoutes.MYMUSIC_SONG_FAVORITE}>
                  {/* <MdOutlineLibraryMusic /> */}
                  <SongIcon />
                  <span>Bài hát</span>

                  <span className='music'>
                    <BsFillPlayFill />
                  </span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={appRoutes.LIBRARY_PLAYLIST}>
                  {/* <MdOutlineLibraryMusic /> */}
                  <PlaylistIcon />
                  <span>Playlist</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={appRoutes.HISTORY}>
                  {/* <MdOutlineLibraryMusic /> */}
                  <RecentIcon />
                  <span>Gần đây</span>
                </Link>
              </MenuItem>
            </Menu>
          ) : (
            <div className='login-box'>
              <p>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
              <button onClick={openAuthModal}>Đăng nhập</button>
            </div>
          )}

          <div className='private-playlists'>
            {private_playlists.map((playlist) => (
              <PlaylistItem
                playlist={playlist}
                is_from_sidebar
                key={playlist.id}
              />
            ))}
          </div>
        </div>
      </div>

      <LoginRequired>
        <button className='sidebar-bottom' onClick={openUploadPlaylistForm}>
          <MdAdd />
          <span>Tạo playlist mới</span>
        </button>
      </LoginRequired>
    </Container>
  );
};

export default Sidebar;
