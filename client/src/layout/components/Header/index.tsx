import { Menu } from '@mui/material';
import React from 'react';
import { FiDownload, FiSettings } from 'react-icons/fi';
import { MdClose, MdLogout, MdSearch } from 'react-icons/md';
import LoginRequired from '../../../components/LoginRequired';
import { DEFAULT_AVATAR } from '../../../constants/images';
import { useAuthContext } from '../../../context/AuthContext';
import { logoutUser } from '../../../redux/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Container } from './style';
import { toast } from 'react-toastify';
import { useUploadContext } from '../../../context/UploadContext';
import { getUsersUploadedSongs } from '../../../redux/song/songSelectors';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import appRoutes from '../../../constants/appRoutes';

const Header = () => {
  const songs = useAppSelector(getUsersUploadedSongs);
  const { openUploadForm } = useUploadContext();
  const [avatarAnchorEl, setAvatarAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openAvatarMenu = Boolean(avatarAnchorEl);
  const { authUser, changeRedirectUrl } = useAuthContext();
  const dispatch = useAppDispatch();

  const handleClickAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarAnchorEl(e.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAvatarAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      changeRedirectUrl(null);
      toast.success('Đăng xuất thành công');
    });
    handleCloseAvatarMenu();
  };

  const handleClickUploadButton = () => {
    // if (songs.length >= MAX_SONG_UPLOADED) {
    // toast.error(`Chỉ được upload tối đa ${MAX_SONG_UPLOADED} bài hát`);
    // } else {
    openUploadForm();
    // }
  };

  return (
    <Container>
      <div className='header-content'>
        <div className='header-left'>
          <div className='header-search'>
            <MdSearch className='search-icon' />
            <MdClose className='delete-icon' />
            <input type='text' placeholder='Tìm kiếm bài hát...' />
          </div>
        </div>
        <div className='header-right'>
          <LoginRequired>
            <button
              className='header-right-item header-upload'
              onClick={handleClickUploadButton}
            >
              <FiDownload />
            </button>
          </LoginRequired>
          <button className='header-right-item header-upload'>
            <FiSettings />
          </button>

          <LoginRequired>
            <button
              aria-label='avatar'
              id='header-avatar-button'
              aria-controls={openAvatarMenu ? 'header-avatar-menu' : undefined}
              aria-expanded={openAvatarMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClickAvatar}
              className='header-right-item header-avatar'
            >
              <img
                src={authUser ? authUser.profile_photo : DEFAULT_AVATAR}
                alt=''
              />
            </button>
          </LoginRequired>
          <Menu
            id='header-avatar-menu'
            MenuListProps={{
              'aria-labelledby': 'header-avatar-button',
            }}
            disablePortal
            anchorEl={avatarAnchorEl}
            open={openAvatarMenu}
            onClose={handleCloseAvatarMenu}
            sx={{
              '& .MuiList-root': {
                padding: 0,
              },
              '& .MuiPaper-root': {
                transform: 'translateY(12px) !important',
              },
            }}
            PaperProps={{
              sx: {
                padding: 0,
                background: 'none',
                boxShadow: 'none',
              },
            }}
          >
            <div className='header-avatar-menu'>
              <h3 className='greeting'>Xin chào {authUser?.full_name}</h3>
              <button
                className='header-avatar-menu-item'
                onClick={handleLogout}
              >
                <MdLogout />
                <span>Đăng xuất</span>
              </button>
              <Link
                to={appRoutes.USER_PROFILE}
                className='header-avatar-menu-item'
                onClick={handleCloseAvatarMenu}
              >
                <FaUser />
                <span>Thông tin cá nhân</span>
              </Link>
            </div>
          </Menu>
        </div>
      </div>
    </Container>
  );
};

export default Header;
