import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from '../../services/common';
import { Song } from '../../services/song';
import {
  changeFavourite,
  deleteUploadSongAction,
  getFavouriteSong,
  getHistorySongsAction,
  getUploadedSong,
  uploadSong,
} from './songActions';

interface SliceState {
  uploaded: {
    data: Song[];
  };
  favourite: {
    data: Song[];
  };
  history: {
    data: Song[];
    pagination: Pagination;
  };
}

const initialState: SliceState = {
  uploaded: {
    data: [],
  },
  favourite: {
    data: [],
  },
  history: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total_count: 1,
    },
  },
};

const songSlice = createSlice({
  name: 'songs',
  reducers: {
    editSongSucess(state, action: PayloadAction<{ song: Song }>) {
      state.uploaded.data = state.uploaded.data.map((song) => {
        if (song.id === action.payload.song.id) {
          return action.payload.song;
        } else {
          return song;
        }
      });
    },
    removeSongOutOfFavourite(state, action: PayloadAction<string[]>) {
      state.favourite.data = state.favourite.data.filter(
        (song) => !action.payload.includes(song.id)
      );
    },
    removeUploadSongs(state, action: PayloadAction<string[]>) {
      state.uploaded.data = state.uploaded.data.filter(
        (song) => !action.payload.includes(song.id)
      );
    },
    resetHistorySongs(state) {
      state.history.data = [];
      state.history.pagination = initialState.history.pagination;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUploadedSong.fulfilled, (state, action) => {
        state.uploaded.data = action.payload.songs;
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.uploaded.data.unshift(action.payload.song);
        state.favourite.data.unshift(action.payload.song);
      })
      .addCase(getFavouriteSong.fulfilled, (state, action) => {
        state.favourite.data = action.payload.songs;
      })
      .addCase(deleteUploadSongAction.fulfilled, (state, action) => {
        state.uploaded.data = state.uploaded.data.filter(
          (song) => song.id !== action.payload
        );
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        state.favourite.data = state.favourite.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
        state.uploaded.data = state.uploaded.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
      })
      .addCase(getHistorySongsAction.fulfilled, (state, action) => {
        state.history.data = [...state.history.data, ...action.payload.data];
        state.history.pagination = action.payload.pagination;
      });
  },
  initialState,
});

export const {
  editSongSucess,
  resetHistorySongs,
  removeSongOutOfFavourite,
  removeUploadSongs,
} = songSlice.actions;
export default songSlice.reducer;
