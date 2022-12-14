import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getHistorySongs,
  GetHistorySongsParams,
  GetHistorySongsResponse,
} from '../../services/history';
import * as services from '../../services/song';
import { logout } from '../auth/authSlice';
import { RootState } from '../store';
import { SONG_ACTION_TYPES } from './songTypes';

interface ActionParams<T, R> {
  data: T;
  onSuccess?: (res: R) => void;
  onError?: (error: string) => void;
}

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
          created_at: new Date().toString(),
          updated_at: new Date().toString(),
        },
      };

      toast.success('Tải bài hát thành công');
      return new_res;
    } catch (error: any) {
      toast.error(error.response?.data?.msg);
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
  services.GetUploadedSongParams
>(
  SONG_ACTION_TYPES.GET_UPLOADED_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getUploadedSong(params);
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
  services.GetUploadedSongParams
>(
  SONG_ACTION_TYPES.GET_FAVOURITE_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getFavouriteSong(params);
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

export const changeFavourite = createAsyncThunk<
  string,
  ActionParams<string, void>
>(
  SONG_ACTION_TYPES.CHANGE_FAVOURITE,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await services.changeFavourite(params.data);
      params.onSuccess?.();
      return params.data;
    } catch (error: any) {
      params.onError?.(error.response?.data.msg || 'Có lỗi xảy ra');
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

export const deleteUploadSongAction = createAsyncThunk<
  string,
  ActionParams<string, string>
>(
  SONG_ACTION_TYPES.DELETE_UPLOAD_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await services.deleteUploadSong(params.data);
      params.onSuccess?.(params.data);
      toast.success('Xóa bài hát thành công');
      return params.data;
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
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

export const getRecommendedSongsAction = createAsyncThunk<
  services.GetRecommendedSongResponse,
  services.GetRecommendedSongParams
>(
  SONG_ACTION_TYPES.GET_RECOMMENDED_SONGS,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getRecommendedSongs(params);
      return res;
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
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

export const getHistorySongsAction = createAsyncThunk<
  GetHistorySongsResponse,
  GetHistorySongsParams
>(
  SONG_ACTION_TYPES.GET_HISTORY_SONGS,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await getHistorySongs(params);
      return res;
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
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
