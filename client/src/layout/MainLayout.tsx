import { useState } from "react";
import { Outlet } from "react-router-dom";
import Player from "./components/Player";
import PlayerQueue from "./components/PlayerQueue";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Header from "./components/Header";
import Modal from "../components/Modal";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import { AuthType, useAuthContext } from "../context/AuthContext";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserInfo } from "../redux/auth/authActions";
import UploadSongForm from "../components/UploadSongForm";
import { useUploadContext } from "../context/UploadContext";
import SignupSuccess from "../pages/Auth/SignupSuccess";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import { useUploadPlaylistContext } from "../context/UploadPlaylistContext";
import NewPlaylistForm from "../components/NewPlaylistForm";
import { useAudioContext } from "../context/AudioContext";
import { getAudioCurrentSongSelector } from "../redux/audioPlayer/audioPlayerSelectors";
import LyricProvider from "../context/LyricContext";
import LyricModal from "./components/LyricModal";
import {
  useFullScreenHandle,
  FullScreenHandle,
  FullScreen,
} from "react-full-screen";

interface StyleProps {
  openPlayer: boolean;
}

const Container = styled.div`
  & .content {
    margin-left: 240px;
    margin-top: 70px;
    min-height: 100vh;
    background-color: #170f23;
    padding-left: var(--padding-section);
    padding-right: var(--padding-section);
    padding-bottom: ${(props: StyleProps) => (props.openPlayer ? "90px" : 0)};

    @media (min-width: 1590px) {
      padding-right: calc(var(--padding-section) + 330px);
    }
  }
`;

const MainLayout = () => {
  const { authType, isOpenAuthModal, closeAuthModal, setIsLoadingUser } =
    useAuthContext();
  const { closeUploadForm, isOpenUploadForm } = useUploadContext();
  const { closeUploadPlaylistForm, isOpenUploadPlaylistForm } =
    useUploadPlaylistContext();
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const [isFullscreenMode, setIsFullScreenMode] = useState<boolean>(false);
  const handle = useFullScreenHandle();

  const { openPlayer } = useAudioContext();

  console.log("Main layout rerender");

  const dispatch = useAppDispatch();

  const onChangeFullScreenMode = (state: boolean, handle: FullScreenHandle) => {
    // console.log({ state, handle });
    setIsFullScreenMode(state);
  };
  // const isFirstRenderRef = useRef<boolean>(true);
  const enterFullscreenMode = () => {
    handle.enter().catch(() => {
      console.warn("Fullscreen mode not support");
    });
  };

  const exitFullscreenMode = () => {
    handle.exit().catch(() => {
      console.warn("Can not exit fullscreen mode");
    });
  };

  const renderAuthLayout = useMemo(() => {
    switch (authType) {
      case AuthType.LOGIN:
        return <Login />;

      case AuthType.SIGNUP:
        return <SignUp />;

      case AuthType.SIGNUP_SUCCESS:
        return <SignupSuccess />;

      case AuthType.FORGOT_PASSWORD:
        return <ForgotPassword />;

      default:
        return <></>;
    }
  }, [authType]);

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

    setIsLoadingUser(true);
    dispatch(getUserInfo()).finally(() => {
      setIsLoadingUser(false);
    });
  }, []);

  return (
    <FullScreen handle={handle} onChange={onChangeFullScreenMode}>
      <Container openPlayer={openPlayer}>
        <Sidebar />
        <Header />

        <Modal open={isOpenAuthModal} maxWidth="sm" onClose={closeAuthModal}>
          {renderAuthLayout}
        </Modal>

        <Modal open={isOpenUploadForm} onClose={closeUploadForm}>
          <UploadSongForm closeUploadModal={closeUploadForm} />
        </Modal>

        <Modal
          maxWidth="xs"
          open={isOpenUploadPlaylistForm}
          onClose={closeUploadPlaylistForm}
        >
          <NewPlaylistForm closeUploadModal={closeUploadPlaylistForm} />
        </Modal>

        <LyricProvider>
          {/* Màn hình lời bài hát (lyric) */}
          <LyricModal
            enterFullscreenMode={enterFullscreenMode}
            exitFullscreenMode={exitFullscreenMode}
            isFullscreenMode={isFullscreenMode}
          />
          {current_song && <Player />}
          <PlayerQueue />
        </LyricProvider>

        <div className="content">
          <Outlet />
        </div>
      </Container>
    </FullScreen>
  );
};

export default MainLayout;
