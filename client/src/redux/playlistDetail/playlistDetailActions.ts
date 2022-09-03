import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as services from '../../services/playlist';
import { logout } from '../auth/authSlice';
import { PLAYLIST_DETAIL_ACTION_TYPES } from './playlistDetailTypes';

export const getPlaylistDetailAction = createAsyncThunk<
  services.GetPlaylistDetailResponse,
  services.GetPlaylistDetailParams
>(
  PLAYLIST_DETAIL_ACTION_TYPES.GET_PLAYLIST_DETAIL,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const res = await services.getPlaylistDetail(params);
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

export const getPlaylistSongsAction = createAsyncThunk<
  services.GetSongsOfPlaylistResponse,
  services.GetPlaylistDetailParams
>(
  PLAYLIST_DETAIL_ACTION_TYPES.GET_SONGS_OF_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const res = await services.getAllSongsOfPlaylist(params);
      return res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(error.response?.data.msg);
    }
  }
);

export const removeSongOutOfPlaylistAction = createAsyncThunk<
  services.UpdatePlaylistSongsParams,
  services.UpdatePlaylistSongsParams
>(
  PLAYLIST_DETAIL_ACTION_TYPES.REMOVE_SONGS_OUT_OF_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await services.removeSongOutOfPlaylist(params);
      toast.success('Đã xóa bài hát khỏi playlist thành công');
      return params;
    } catch (error: any) {
      toast.error(error.response?.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(error.response?.data.msg);
    }
  }
);
