import { createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../services/playlist';
import {
  deletePlaylist,
  editPlaylist,
  getPrivatePlaylists,
} from './playlistActions';

interface SliceState {
  private: {
    data: Playlist[];
  };
}

const initialState: SliceState = {
  private: {
    data: [],
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPrivatePlaylists.fulfilled, (state, action) => {
        state.private.data = action.payload.playlists;
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
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.private.data = state.private.data.filter((p) => p.id !== id);
      });
  },
});

export default playlistSlice.reducer;
