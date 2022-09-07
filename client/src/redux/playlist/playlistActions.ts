import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as services from '../../services/playlist';
import { Song } from '../../services/song';
import { logout } from '../auth/authSlice';
import { PLAYLIST_ACTION_TYPES } from './playlistTypes';
interface ActionParams<T, R> {
  data: T;
  onSuccess?: (res: R) => void;
  onError?: (error: string) => void;
}

interface CreatePlaylistParams {
  data: services.CreatePlaylistParams;
  onSuccess?: (id: string) => void;
}

interface EditPlaylistParams {
  data: services.UpdatePlaylistParams;
  onSuccess?: () => void;
}

interface DeletePlaylistParams {
  data: services.DeletePlaylistParams;
  onSuccess?: () => void;
}

interface GetUserPlaylistsResponse {
  data: services.GetPrivatePlaylistResponse;
  is_own: boolean;
}

interface AddSongsToPlaylistParams {
  songs: Song[];
  playlist_id: string;
}

export const createNewPlaylist = createAsyncThunk<
  services.CreatePlaylistResponse,
  CreatePlaylistParams
>(
  PLAYLIST_ACTION_TYPES.CREATE_NEW_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const res = await services.createNewPlaylist(params.data);
      params.onSuccess?.(res.play_list.id);
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

export const getPrivatePlaylists = createAsyncThunk<
  GetUserPlaylistsResponse,
  services.GetPrivatePlaylistParams
>(
  PLAYLIST_ACTION_TYPES.GET_PRIVATE_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const res = await services.getPrivatePlaylists(params);
      return {
        data: res,
        is_own: Boolean(params.is_own),
      };
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

export const editPlaylist = createAsyncThunk<
  services.UpdatePlaylistParams,
  EditPlaylistParams
>(
  PLAYLIST_ACTION_TYPES.EDIT_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await services.updatePlaylist(params.data);
      toast.success('Chỉnh sửa playlist thành công');
      params.onSuccess?.();
      return params.data;
    } catch (error: any) {
      toast.error('Chỉnh sửa playist thất bại');
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

export const deletePlaylist = createAsyncThunk<
  services.DeletePlaylistParams,
  DeletePlaylistParams
>(
  PLAYLIST_ACTION_TYPES.DELETE_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await services.deletePlaylist(params.data);
      params.onSuccess?.();
      toast.success('Xóa playlist thành công');

      return params.data;
    } catch (error: any) {
      toast.success('Xóa playlist thất bại');
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

export const changePlaylistFavourite = createAsyncThunk<
  string,
  ActionParams<string, string>
>(
  PLAYLIST_ACTION_TYPES.CHANGE_PLAYLIST_FAVOURITE,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await services.changePlaylistFavourite({ id: params.data });
      params.onSuccess?.(params.data);
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

export const addSongsToPlaylistActions = createAsyncThunk<
  AddSongsToPlaylistParams,
  ActionParams<AddSongsToPlaylistParams, AddSongsToPlaylistParams>
>(
  PLAYLIST_ACTION_TYPES.ADD_SONGS_TO_PLAYLIST,
  async (params, { dispatch, rejectWithValue }) => {
    try {
      // for (const song of params.data.songs) {
      //   await services.addSongToPlaylist({
      //     playlist_id: params.data.playlist_id,
      //     song_id: song.id,
      //   });
      // }

      await services.addSongToPlaylist({
        playlist_id: params.data.playlist_id,
        song_id: params.data.songs.map((s) => s.id),
      });

      params.onSuccess?.(params.data);
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
