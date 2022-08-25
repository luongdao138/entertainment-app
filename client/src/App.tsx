import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import MyMusicPage from './pages/MyMusicPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='mymusic' element={<MyMusicPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
