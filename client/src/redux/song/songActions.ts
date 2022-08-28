import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from '../../services/song';
import { logout } from '../auth/authSlice';
import { RootState } from '../store';
import { SONG_ACTION_TYPES } from './songTypes';

export const uploadSong = createAsyncThunk<
  services.UploadSongResponse,
  services.UploadSongParams
>(
  SONG_ACTION_TYPES.UPLOAD_SONG,
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await services.uploadSong(params);
      const new_res = {
        song: {
          ...res.song,
          is_liked: true,
          user_id: (getState() as RootState).auth.user?.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      };
      return new_res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);

export const getUploadedSong = createAsyncThunk<
  services.GetUploadedSongResponse,
  void
>(
  SONG_ACTION_TYPES.GET_UPLOADED_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getUploadedSong();
      return res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);

export const getFavouriteSong = createAsyncThunk<
  services.GetUploadedSongResponse,
  void
>(
  SONG_ACTION_TYPES.GET_FAVOURITE_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getFavouriteSong();
      return res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);

export const changeFavourite = createAsyncThunk<void, string>(
  SONG_ACTION_TYPES.CHANGE_FAVOURITE,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await services.changeFavourite(params);
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);
