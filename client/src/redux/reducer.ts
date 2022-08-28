import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import metadataReducer from './metadata/reducers';
import songReducer from './song/songSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songReducer,
  metadata: metadataReducer,
});

export default rootReducer;
