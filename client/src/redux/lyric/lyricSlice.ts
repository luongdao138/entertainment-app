import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../services/category";
import { Lyric } from "../../services/song";
import { AudioSong } from "../audioPlayer/audioPlayerSlice";
import { getSongLyricAction } from "./lyricActions";

interface SliceState {
  song: AudioSong | null;
  data: Lyric | null;
}

const initialState: SliceState = {
  song: null,
  data: null,
};

const lyricSlice = createSlice({
  name: "category",
  reducers: {
    resetLyric(state) {
      state.data = null;
      state.song = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSongLyricAction.fulfilled, (state, action) => {
      state.song = action.payload.song;
      state.data = action.payload.data;
    });
  },
  initialState,
});

export const { resetLyric } = lyricSlice.actions;
export default lyricSlice.reducer;
