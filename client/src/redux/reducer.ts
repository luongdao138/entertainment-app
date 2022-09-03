import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import metadataReducer from './metadata/reducers';
import playlistReducer from './playlist/playlistSlice';
import playlistDetailReducer from './playlistDetail/playlistDetailSlice';
import songReducer from './song/songSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  playlist: playlistReducer,
  metadata: metadataReducer,
  playlistDetail: playlistDetailReducer,
});

export default rootReducer;
