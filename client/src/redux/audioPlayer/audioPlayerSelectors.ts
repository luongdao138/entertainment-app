import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.audioPlayer;

export const getAudioVolumeSelector = createSelector(
  getRoot,
  (state) => state.audio_state.volume
);

export const getAudioCurrentSongSelector = createSelector(
  getRoot,
  (state) => state.current_song
);

export const getAudioStateSelector = createSelector(
  getRoot,
  (state) => state.audio_state
);

export const getAudioArchivedListSelector = createSelector(
  getRoot,
  (state) => state.archived_list.data
);

export const getAudioNextListSelector = createSelector(
  getRoot,
  (state) => state.next_list.data
);

export const getAudioRecommendListSelector = createSelector(
  getRoot,
  (state) => state.recommended_list.data
);

export const getAudioMetaSelector = createSelector(
  getRoot,
  (state) => state.audio_meta
);

export const getAudioCurrentPlaylistSelector = createSelector(
  getRoot,
  (state) => state.current_playlist.data
);

export const getAudioCurrentListSongs = createSelector(
  getRoot,
  (state) => state.audio_list_songs
);
