import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import MyMusicPage from './pages/MyMusicPage';
import Song from './pages/MyMusicPage/Song';
import FavouriteSong from './pages/MyMusicPage/Song/FavouriteSong';
import UploadedSong from './pages/MyMusicPage/Song/UploadedSong';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequiredAuth from './components/LoginRequired/RequiredAuth';
import UserProfilePage from './pages/UserProfilePage';
import VerifyAccount from './pages/Auth/VerifyAccount';
import AlreadyAuth from './components/AlreadyAuth';
import RetrievePassword from './pages/Auth/RetrievePassword';
import appRoutes from './constants/appRoutes';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import LibraryPlaylist from './pages/MyMusicPage/LibraryPlaylist';

function App() {
  return (
    <>
      <ToastContainer position='top-right' autoClose={2500} theme='colored' />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* Những route cần người dùng đăng nhập vào */}
          <Route element={<RequiredAuth />}>
            <Route path='mymusic/' element={<MyMusicPage />}>
              <Route element={<Song />}>
                <Route index element={<FavouriteSong />} />
              </Route>
              <Route path='song' element={<Song />}>
                <Route index element={<FavouriteSong />} />
                <Route path='favourite' element={<FavouriteSong />} />
                <Route path='upload' element={<UploadedSong />} />
              </Route>
            </Route>
            <Route
              path={appRoutes.LIBRARY_PLAYLIST}
              element={<LibraryPlaylist />}
            />
            <Route path='profile' element={<UserProfilePage />} />
          </Route>

          {/* Những route đăng nhập hay không đều vào được */}
          <Route
            path={appRoutes.PLAYLIST_DETAIL}
            element={<PlaylistDetailPage />}
          />

          {/* Những route mà nếu người dùng đã đăng nhập thì ko đc vào */}
          <Route element={<AlreadyAuth />}>
            <Route
              path={appRoutes.VERIFY_ACCOUNT}
              element={<VerifyAccount />}
            />
            <Route
              path={appRoutes.FORGOT_PASSWORD}
              element={<RetrievePassword />}
            />
          </Route>

          <Route path='*' element={<Navigate to={appRoutes.HOME} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
