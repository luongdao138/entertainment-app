import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AlreadyAuth from '../components/AlreadyAuth';
import RequiredAuth from '../components/LoginRequired/RequiredAuth';
import appRoutes from '../constants/appRoutes';
import MainLayout from '../layout/MainLayout';
import RetrievePassword from '../pages/Auth/RetrievePassword';
import VerifyAccount from '../pages/Auth/VerifyAccount';
import HomePage from '../pages/HomePage';
import MyMusicPage from '../pages/MyMusicPage';
import LibraryPlaylist from '../pages/MyMusicPage/LibraryPlaylist';
import Song from '../pages/MyMusicPage/Song';
import FavouriteSong from '../pages/MyMusicPage/Song/FavouriteSong';
import UploadedSong from '../pages/MyMusicPage/Song/UploadedSong';
import PlaylistDetailPage from '../pages/PlaylistDetailPage';
import SongDetailPage from '../pages/SongDetailPage';
import UserProfilePage from '../pages/UserProfilePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />

        {/* Những route cần người dùng đăng nhập vào */}
        <Route element={<RequiredAuth />}>
          <Route path='mymusic/'>
            <Route element={<MyMusicPage />}>
              <Route element={<Song />}>
                <Route index element={<FavouriteSong />} />
              </Route>
              <Route path='song' element={<Song />}>
                <Route index element={<FavouriteSong />} />
                <Route path='favourite' element={<FavouriteSong />} />
                <Route path='upload' element={<UploadedSong />} />
              </Route>
            </Route>
            <Route path='library/playlist' element={<LibraryPlaylist />} />
          </Route>
          <Route path='profile' element={<UserProfilePage />} />
          <Route
            path='playlist/:playlist_id'
            element={<PlaylistDetailPage />}
          />
          <Route path='song/:song_id' element={<SongDetailPage />} />
        </Route>

        {/* Những route đăng nhập hay không đều vào được */}

        {/* Những route mà nếu người dùng đã đăng nhập thì ko đc vào */}
        <Route element={<AlreadyAuth />}>
          <Route path={appRoutes.VERIFY_ACCOUNT} element={<VerifyAccount />} />
          <Route
            path={appRoutes.FORGOT_PASSWORD}
            element={<RetrievePassword />}
          />
        </Route>

        <Route path='*' element={<Navigate to={appRoutes.HOME} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
