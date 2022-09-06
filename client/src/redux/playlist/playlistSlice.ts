import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../services/playlist';
import {
  changePlaylistFavourite,
  createNewPlaylist,
  deletePlaylist,
  editPlaylist,
  getPrivatePlaylists,
} from './playlistActions';

interface SliceState {
  private: {
    data: Playlist[];
  };
  library: {
    data: Playlist[];
  };
}

const initialState: SliceState = {
  private: {
    data: [],
  },
  library: {
    data: [],
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addFavouritePlaylist(state, action: PayloadAction<{ playlist: Playlist }>) {
      state.library.data.unshift(action.payload.playlist);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPrivatePlaylists.fulfilled, (state, { payload }) => {
        if (payload.is_own) {
          state.private.data = payload.data.playlists;
        } else {
          state.library.data = payload.data.playlists;
        }
      })
      .addCase(editPlaylist.fulfilled, (state, action) => {
        const { data, id } = action.payload;
        state.private.data = state.private.data.map((p) =>
          p.id === id
            ? {
                ...p,
                title: data.title,
                play_random: data.play_random,
                privacy: data.is_public ? 'public' : 'private',
              }
            : p
        );

        state.library.data = state.library.data.map((p) =>
          p.id === id
            ? {
                ...p,
                title: data.title,
                play_random: data.play_random,
                privacy: data.is_public ? 'public' : 'private',
              }
            : p
        );
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.private.data = state.private.data.filter((p) => p.id !== id);
        state.library.data = state.library.data.filter((p) => p.id !== id);
      })
      .addCase(changePlaylistFavourite.fulfilled, (state, action) => {
        state.library.data = state.library.data.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(createNewPlaylist.fulfilled, (state, action) => {
        state.private.data.unshift(action.payload.play_list);
      });
  },
});

export const { addFavouritePlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
