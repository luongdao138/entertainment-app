import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  DeleteSongOutHistoryParams,
  deleteSongOutOfHistory,
  getHistorySongs,
  GetHistorySongsParams,
  GetHistorySongsResponse,
} from '../../services/history';
import { logout } from '../auth/authSlice';
import { HISTORY_ACTION_TYPES } from './historyTypes';

export const getHistorySongActions = createAsyncThunk<
  GetHistorySongsResponse,
  GetHistorySongsParams
>(
  HISTORY_ACTION_TYPES.GET_HISTORY_SONGS,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await getHistorySongs(params);
      return res;
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

export const deleteHistorySongAction = createAsyncThunk<
  DeleteSongOutHistoryParams,
  DeleteSongOutHistoryParams
>(
  HISTORY_ACTION_TYPES.DELETE_HISTORY_SONG,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await deleteSongOutOfHistory(params);
      return params;
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
