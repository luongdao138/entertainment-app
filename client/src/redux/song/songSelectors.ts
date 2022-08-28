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
