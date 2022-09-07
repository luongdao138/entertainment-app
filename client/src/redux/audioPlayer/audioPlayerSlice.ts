import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, PlaylistDetail } from '../../services/playlist';
import { Song, SongDetail } from '../../services/song';
import { v4 as uuid } from 'uuid';

import {
  changeFavourite,
  getRecommendedSongsAction,
} from '../song/songActions';

export type AudioSong = Song | SongDetail;
export type AudioPlaylist = Playlist | PlaylistDetail;

interface SliceState {
  audio_state: {
    is_shuffle: boolean;
    is_from_recommend: boolean;
    is_autoplay_recommend: boolean;
  };
  current_song: AudioSong | null;
  archived_list: {
    data: AudioSong[];
  };
  next_list: {
    data: AudioSong[];
  };
  recommended_list: {
    data: Song[];
  };
  volume: number;
  audio_meta: {
    is_audio_playing: boolean;
    is_audio_loading: boolean;
  };
  current_playlist: {
    data: AudioPlaylist | null;
  };
  audio_list_songs: AudioSong[];
}

const initialState: SliceState = {
  archived_list: {
    data: [],
  },
  current_song: null,
  audio_meta: {
    is_audio_playing: false,
    is_audio_loading: false,
  },
  audio_state: {
    is_shuffle: false,
    is_from_recommend: false,
    is_autoplay_recommend: true,
  },
  next_list: {
    data: [],
  },
  recommended_list: {
    data: [],
  },
  volume: 1,
  current_playlist: {
    data: null,
  },
  audio_list_songs: [],
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  reducers: {
    changeAudioCurrentSong(
      state,
      action: PayloadAction<{ new_current_song: AudioSong | null }>
    ) {
      state.current_song = action.payload.new_current_song;
    },
    changeAudioRecommendedList(
      state,
      action: PayloadAction<{ list: AudioSong[] }>
    ) {
      state.recommended_list.data = action.payload.list;
    },
    changeAudioArchivedList(
      state,
      action: PayloadAction<{ list: AudioSong[] }>
    ) {
      state.archived_list.data = action.payload.list;
    },
    changeAudioNextList(state, action: PayloadAction<{ list: AudioSong[] }>) {
      state.next_list.data = action.payload.list;
    },
    changeAudioListSongs(state, action: PayloadAction<{ list: AudioSong[] }>) {
      state.audio_list_songs = action.payload.list;
    },
    changeAudioCurrentPlaylist(
      state,
      action: PayloadAction<{ playlist: AudioPlaylist | null }>
    ) {
      state.current_playlist.data = action.payload.playlist;
    },
    changeAudioCurrentState(
      state,
      action: PayloadAction<{ new_state: Partial<SliceState['audio_state']> }>
    ) {
      state.audio_state = { ...state.audio_state, ...action.payload.new_state };
    },
    changeAudioCurrentMeta(
      state,
      action: PayloadAction<{ new_meta: Partial<SliceState['audio_meta']> }>
    ) {
      state.audio_meta = { ...state.audio_meta, ...action.payload.new_meta };
    },
    addSongsToPlayerList(state, action: PayloadAction<{ songs: AudioSong[] }>) {
      // if (!state.audio_state.is_from_recommend) {
      const new_songs = action.payload.songs.map((s) => ({
        ...s,
        is_current_audio: false,
        queue_id: uuid(),
      }));
      state.next_list.data = state.next_list.data.concat(new_songs);
      state.audio_list_songs = state.audio_list_songs.concat(new_songs);
      // }
    },
    addSongToPlayNext(state, action: PayloadAction<{ song: AudioSong }>) {
      // if (!state.audio_state.is_from_recommend) {
      let new_song: AudioSong = {
        ...action.payload.song,
        is_current_audio: false,
        queue_id: uuid(),
      };
      state.next_list.data.unshift(new_song);
      state.audio_list_songs.push(new_song);
      // }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRecommendedSongsAction.fulfilled, (state, action) => {
        state.recommended_list.data = action.payload.songs.map((s) => ({
          ...s,
          is_current_audio: false,
          queue_id: uuid(),
        }));
      })
      .addCase(changeFavourite.fulfilled, (state, action) => {
        if (state.current_song && state.current_song.id === action.payload) {
          state.current_song.is_liked = !state.current_song.is_liked;
        }

        state.archived_list.data = state.archived_list.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );

        state.next_list.data = state.next_list.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );

        state.recommended_list.data = state.recommended_list.data.map((s) =>
          s.id === action.payload ? { ...s, is_liked: !s.is_liked } : s
        );
      });
  },
  initialState,
});

export const {
  changeAudioCurrentSong,
  changeAudioArchivedList,
  changeAudioNextList,
  changeAudioRecommendedList,
  changeAudioListSongs,
  changeAudioCurrentPlaylist,
  changeAudioCurrentMeta,
  changeAudioCurrentState,
  addSongToPlayNext,
  addSongsToPlayerList,
} = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
