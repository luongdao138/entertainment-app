import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import MyMusicPage from './pages/MyMusicPage';
import Song from './pages/MyMusicPage/Song';
import FavouriteSong from './pages/MyMusicPage/Song/FavouriteSong';
import UploadedSong from './pages/MyMusicPage/Song/UploadedSong';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequiredAuth from './components/LoginRequired/RequiredAuth';

function App() {
  return (
    <>
      <ToastContainer position='top-right' autoClose={2500} theme='colored' />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
