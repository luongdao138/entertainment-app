import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from '../../services/song';
import { logout } from '../auth/authSlice';
import { SONG_DETAIL_ACTION_TYPES } from './songDetailTypes';

export const getSongDetailAction = createAsyncThunk<
  services.GetSongDetailResponse,
  services.GetSongDetailParams
>(
  SONG_DETAIL_ACTION_TYPES.GET_SONG_DETAIL,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const res = await services.getSongDetail(params);
      return res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(error.response?.status);
    }
  }
);
