import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaylistDetail } from '../../services/playlist';
import { Song } from '../../services/song';
import { editPlaylist } from '../playlist/playlistActions';
import {
  getPlaylistDetailAction,
  getPlaylistSongsAction,
  removeSongOutOfPlaylistAction,
} from './playlistDetailActions';

interface SliceState {
  data: PlaylistDetail | null;
  songs: {
    data: Song[];
  };
}

const initialState: SliceState = {
  data: null,
  songs: {
    data: [],
  },
};

const playlistDetailSlice = createSlice({
  name: 'playlistDetail',
  initialState,
  reducers: {
    likePlaylist(state) {
      if (state.data) state.data.is_liked = !state.data.is_liked;
    },
    changeSongsPosition(state, action: PayloadAction<Song[]>) {
      state.songs.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPlaylistDetailAction.fulfilled, (state, action) => {
        state.data = action.payload.playlist;
      })
      .addCase(editPlaylist.fulfilled, (state, { payload: { data, id } }) => {
        if (id === state.data?.id) {
          state.data = {
            ...state.data,
            title: data.title,
            play_random: data.play_random,
            privacy: data.is_public ? 'public' : 'private',
          };
        }
      })
      .addCase(getPlaylistSongsAction.fulfilled, (state, action) => {
        state.songs.data = action.payload.songs;
      })
      .addCase(removeSongOutOfPlaylistAction.fulfilled, (state, action) => {
        const { playlist_id, song_id } = action.payload;
        if (state.data && playlist_id === state.data.id) {
          state.songs.data = state.songs.data.filter((s) => s.id !== song_id);
        }

        const new_songs = [...state.songs.data];
        for (const key in new_songs) {
          new_songs[key].position = Number(key);
        }

        state.songs.data = new_songs;
      });
  },
});

export const { likePlaylist, changeSongsPosition } =
  playlistDetailSlice.actions;
export default playlistDetailSlice.reducer;
