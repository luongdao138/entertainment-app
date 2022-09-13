import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as services from '../../services/song';
import { AudioSong } from '../audioPlayer/audioPlayerSlice';
import { logout } from '../auth/authSlice';
import { LYRIC_ACTION_TYPES } from './lyricTypes';

interface GetSongLyricReponse {
  song: AudioSong;
  data: services.GetSongLyricReponse['data'];
}

export const getSongLyricAction = createAsyncThunk<
  GetSongLyricReponse,
  services.GetSongLyricParams
>(
  LYRIC_ACTION_TYPES.GET_SONG_LYRIC,
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await services.getSongLyric(params);
      return {
        song: params.song,
        data: res.data,
      };
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
