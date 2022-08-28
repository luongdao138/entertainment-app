import { Outlet } from 'react-router-dom';
import Player from './components/Player';
import PlayerQueue from './components/PlayerQueue';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import Header from './components/Header';
import Modal from '../components/Modal';
import SignUp from '../pages/Auth/SignUp';
import Login from '../pages/Auth/Login';
import { useAuthContext } from '../context/AuthContext';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getUserInfo } from '../redux/auth/authActions';
import UploadSongForm from '../components/UploadSongForm';
import { useUploadContext } from '../context/UploadContext';

const Container = styled.div`
  & .content {
    margin-left: 240px;
    margin-top: 70px;
    min-height: 100vh;
    background-color: #170f23;
    padding-left: var(--padding-section);
    padding-right: var(--padding-section);
  }
`;

const MainLayout = () => {
  const { authType, isOpenAuthModal, closeAuthModal, setIsLoadingUser } =
    useAuthContext();
  const { closeUploadForm, isOpenUploadForm } = useUploadContext();
  const dispatch = useAppDispatch();
  const isFirstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    setIsLoadingUser(true);
    dispatch(getUserInfo()).finally(() => {
      setIsLoadingUser(false);
    });
  }, []);

  return (
    <Container>
      <Sidebar />
      <Header />

      <Modal open={isOpenAuthModal} maxWidth='sm' onClose={closeAuthModal}>
        {authType === 'login' ? <Login /> : <SignUp />}
      </Modal>

      <Modal open={isOpenUploadForm} onClose={closeUploadForm}>
        <UploadSongForm closeUploadModal={closeUploadForm} />
      </Modal>

      {/* <Player /> */}
      {/* <PlayerQueue /> */}
      <div className='content'>
        <Outlet />
      </div>
    </Container>
  );
};

export default MainLayout;
