import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import metadataReducer from './metadata/reducers';
import playlistReducer from './playlist/playlistSlice';
import songReducer from './song/songSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  playlist: playlistReducer,
  metadata: metadataReducer,
});

export default rootReducer;
