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
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import historyReducer from './history/historySlice';

const persistedAudioPlayerReducer = persistReducer(
  {
    key: 'audioPlayer',
    storage,
    blacklist: ['audio_meta', 'can_auto_play'],
    // stateReconciler: autoMergeLevel2,
  },
  audioPlayerReducer
);

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  playlist: playlistReducer,
  metadata: metadataReducer,
  playlistDetail: playlistDetailReducer,
  category: categoryReducer,
  songDetail: songDetaiReducer,
  audioPlayer: persistedAudioPlayerReducer,
  lyric: lyricReducer,
  history: historyReducer,
});

export default rootReducer;
