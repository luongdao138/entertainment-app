import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.playlist;

export const getPrivatePlaylist = createSelector(
  getRoot,
  (state) => state.private.data
);
