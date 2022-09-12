import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.lyric;

export const getLyricSongIdSelector = createSelector(
  getRoot,
  (state) => state.song_id
);

export const getLyricSongDataSelector = createSelector(
  getRoot,
  (state) => state.data
);
