import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../services/playlist';
import { Song, SongDetail } from '../../services/song';
import { changePlaylistFavourite } from '../playlist/playlistActions';
import { changeFavourite } from '../song/songActions';
import { getSongDetailAction } from './songDetailActions';

interface SliceState {
  data: SongDetail | null;
  recommended: {
    data: Song[];
  };
  feature_playlists: {
    data: Playlist[];
  };
}

const initialState: SliceState = {
  data: null,
  feature_playlists: {
    data: [],
  },
  recommended: {
    data: [],
  },
};

const songDetailSlice = createSlice({
  name: 'songDetail',
  initialState,
  reducers: {
    changeFavouritePlaylistSuccess(state, action: PayloadAction<string>) {
      state.feature_playlists.data = state.feature_playlists.data.map((p) =>
        p.id === action.payload ? { ...p, is_liked: !p.is_liked } : p
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSongDetailAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.recommended.data = action.payload.recommended_songs;
        state.feature_playlists.data = action.payload.feature_playlists;
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        if (state.data && state.data.id === action.payload) {
          state.data.is_liked = !state.data.is_liked;
        }

        state.recommended.data = state.recommended.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
      })
      .addCase(changePlaylistFavourite.fulfilled, (state, action) => {
        state.feature_playlists.data = state.feature_playlists.data.map((fl) =>
          fl.id === action.payload ? { ...fl, is_liked: !fl.is_liked } : fl
        );
      });
  },
});

export const { changeFavouritePlaylistSuccess } = songDetailSlice.actions;
export default songDetailSlice.reducer;
