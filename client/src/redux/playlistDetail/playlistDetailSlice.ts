import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaylistDetail } from '../../services/playlist';
import { Song } from '../../services/song';
import {
  editPlaylist,
  changePlaylistFavourite,
  addSongsToPlaylistActions,
} from '../playlist/playlistActions';
import { changeFavourite } from '../song/songActions';
import {
  getPlaylistDetailAction,
  getPlaylistSongsAction,
  getRecommendedSongsActions,
  removeSongOutOfPlaylistAction,
} from './playlistDetailActions';

interface SliceState {
  data: PlaylistDetail | null;
  songs: {
    data: Song[];
  };
  recommended: {
    data: Song[];
    title: string;
  };
}

const initialState: SliceState = {
  data: null,
  songs: {
    data: [],
  },
  recommended: {
    data: [],
    title: '',
  },
};

const playlistDetailSlice = createSlice({
  name: 'playlistDetail',
  initialState,
  reducers: {
    changeSongsPosition(state, action: PayloadAction<Song[]>) {
      state.songs.data = action.payload;
    },
    deleteMultipleSongsOutOfPlaylist(state, action: PayloadAction<string[]>) {
      state.songs.data = state.songs.data.filter(
        (song) => !action.payload.includes(song.id)
      );
      const new_songs = [...state.songs.data];
      for (const key in new_songs) {
        new_songs[key].position = Number(key);
      }

      state.songs.data = new_songs;
    },
    shuffleRecommendedSongs(state, action: PayloadAction<{ songs: Song[] }>) {
      state.recommended.data = action.payload.songs;
    },
    // addSongToPlaylistSuccess(state, action: PayloadAction<{ song: Song }>) {
    //   state.songs.data.push(action.payload.song);
    //   state.recommended.data = state.recommended.data.filter(
    //     (song) => song.id !== action.payload.song.id
    //   );
    // },
    clearData(state, action: PayloadAction<void>) {
      state.data = initialState.data;
      state.recommended = initialState.recommended;
      state.songs = initialState.songs;
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
      })
      .addCase(getRecommendedSongsActions.fulfilled, (state, action) => {
        state.recommended.data = action.payload.songs;
        state.recommended.title = action.payload.title;
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        state.songs.data = state.songs.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
        state.recommended.data = state.recommended.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
      })
      .addCase(changePlaylistFavourite.fulfilled, (state, action) => {
        if (state.data && action.payload === state.data.id) {
          state.data.is_liked = !state.data.is_liked;
        }
      })
      .addCase(addSongsToPlaylistActions.fulfilled, (state, action) => {
        if (action.payload.playlist_id === state.data?.id) {
          const song_ids = state.songs.data.map((s) => s.id);
          state.songs.data = [
            ...state.songs.data,
            ...action.payload.songs.filter((s) => !song_ids.includes(s.id)),
          ];
          state.recommended.data = state.recommended.data.filter(
            (song) => !action.payload.songs.map((s) => s.id).includes(song.id)
          );
        }
      });
  },
});

export const {
  changeSongsPosition,
  shuffleRecommendedSongs,
  deleteMultipleSongsOutOfPlaylist,
  clearData,
  // addSongToPlaylistSuccess,
} = playlistDetailSlice.actions;
export default playlistDetailSlice.reducer;
