import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import metadataReducer from './metadata/reducers';
import playlistReducer from './playlist/playlistSlice';
import playlistDetailReducer from './playlistDetail/playlistDetailSlice';
import categoryReducer from './category/categorySlice';
import songReducer from './song/songSlice';
import songDetaiReducer from './songDetail/songDetailSlice';
import audioPlayerReducer from './audioPlayer/audioPlayerSlice';
import lyricReducer from './lyric/lyricSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  playlist: playlistReducer,
  metadata: metadataReducer,
  playlistDetail: playlistDetailReducer,
  category: categoryReducer,
  songDetail: songDetaiReducer,
  audioPlayer: audioPlayerReducer,
  lyric: lyricReducer,
});

export default rootReducer;
