import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.playlistDetail;

export const getPlaylistDetailSelector = createSelector(
  getRoot,
  (state) => state.data
);

export const getPlaylistSongsSelector = createSelector(
  getRoot,
  (state) => state.songs.data
);
