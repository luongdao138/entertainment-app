import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.songDetail;

export const getSongDetailSelector = createSelector(
  getRoot,
  (state) => state.data
);

export const getRecommendedSongsSelector = createSelector(
  getRoot,
  (state) => state.recommended.data
);

export const getFeaturePlaylists = createSelector(
  getRoot,
  (state) => state.feature_playlists.data
);
