import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../services/category';
import { Pagination } from '../../services/common';
import { Playlist } from '../../services/playlist';
import { Song } from '../../services/song';
import { changeFavourite } from '../song/songActions';
import { getHistorySongActions } from './historyActions';

interface SliceState {
  song: {
    data: Song[];
    pagination: Pagination;
  };
  playlist: {
    data: Playlist[];
    pagination: Pagination;
  };
}

const initialState: SliceState = {
  playlist: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total_count: -1,
    },
  },
  song: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total_count: -1,
    },
  },
};

const historySlice = createSlice({
  name: 'history',
  reducers: {
    resetHistoryData(state) {
      state.song = initialState.song;
      state.playlist = initialState.playlist;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHistorySongActions.fulfilled, (state, action) => {
        state.song.data = [...state.song.data, ...action.payload.data];
        state.song.pagination = action.payload.pagination;
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        state.song.data = state.song.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
      });
  },
  initialState,
});

export const { resetHistoryData } = historySlice.actions;
export default historySlice.reducer;
