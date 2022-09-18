import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.songs;

export const getUsersUploadedSongs = createSelector(
  getRoot,
  (state) => state.uploaded.data
);

export const getUsersFavouriteSongs = createSelector(
  getRoot,
  (state) => state.favourite.data
);

export const getUserHistorySongsSelector = createSelector(
  getRoot,
  (state) => state.history.data
);

export const getUserHistorySongsPaginationSelector = createSelector(
  getRoot,
  (state) => state.history.pagination
);

export const getUploadedSongsPaginationSelector = createSelector(
  getRoot,
  (state) => state.uploaded.pagination
);

export const getFavouriteSongsPaginationSelector = createSelector(
  getRoot,
  (state) => state.favourite.pagination
);
