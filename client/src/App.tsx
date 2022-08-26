import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import MyMusicPage from './pages/MyMusicPage';
import Song from './pages/MyMusicPage/Song';
import FavouriteSong from './pages/MyMusicPage/Song/FavouriteSong';
import UploadedSong from './pages/MyMusicPage/Song/UploadedSong';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='mymusic/' element={<MyMusicPage />}>
               <Route element={<Song/>}>
                   <Route index element={<FavouriteSong/>} />
               </Route>
               <Route path='song' element={<Song/>}>
                   <Route index element={<FavouriteSong/>} />
                   <Route path='favourite' element={<FavouriteSong/>} />
                   <Route path='upload' element={<UploadedSong/>} />
               </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
