import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../services/playlist';
import { Song, SongDetail } from '../../services/song';
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
    builder.addCase(getSongDetailAction.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.recommended.data = action.payload.recommended_songs;
      state.feature_playlists.data = action.payload.feature_playlists;
    });
  },
});

export const { changeFavouritePlaylistSuccess } = songDetailSlice.actions;
export default songDetailSlice.reducer;
