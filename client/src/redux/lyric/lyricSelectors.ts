import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getRoot = (state: RootState) => state.lyric;

export const getLyricSongSelector = createSelector(
  getRoot,
  (state) => state.song
);

export const getLyricSongDataSelector = createSelector(
  getRoot,
  (state) => state.data
);
