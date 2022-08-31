import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Divider, Logo, Menu, MenuItem } from './style';
import { MdAdd, MdOutlineLibraryMusic } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import LoginRequired from '../../../components/LoginRequired';
import appRoutes from '../../../constants/appRoutes';
import { useAuthContext } from '../../../context/AuthContext';
import { useUploadPlaylistContext } from '../../../context/UploadPlaylistContext';

const Sidebar = () => {
  const { authUser, openAuthModal } = useAuthContext();
  const location = useLocation();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();

  return (
    <Container>
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
              <MdOutlineLibraryMusic />
              <span>Khám phá</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/'>
              <MdOutlineLibraryMusic />
              <span>#zingchart</span>

              <span className='music'>
                <BsFillPlayFill />
              </span>
            </Link>
          </MenuItem>
        </Menu>

        <Divider />

        {authUser ? (
          <Menu>
            <h2>Thư viện</h2>
            <MenuItem>
              <Link to={appRoutes.MYMUSIC_SONG_FAVORITE}>
                <MdOutlineLibraryMusic />
                <span>Bài hát</span>

                <span className='music'>
                  <BsFillPlayFill />
                </span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to='/'>
                <MdOutlineLibraryMusic />
                <span>Playlist</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to='/'>
                <MdOutlineLibraryMusic />
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
      </div>

      <button className='sidebar-bottom' onClick={openUploadPlaylistForm}>
        <MdAdd />
        <span>Tạo playlist mới</span>
      </button>
    </Container>
  );
};

export default Sidebar;
