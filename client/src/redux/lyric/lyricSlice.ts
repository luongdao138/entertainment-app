import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../services/category';
import { Lyric } from '../../services/song';
import { getSongLyricAction } from './lyricActions';

interface SliceState {
  song_id: string | null;
  data: Lyric | null;
}

const initialState: SliceState = {
  song_id: null,
  data: null,
};

const lyricSlice = createSlice({
  name: 'category',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSongLyricAction.fulfilled, (state, action) => {
      state.song_id = action.payload.song_id;
      state.data = action.payload.data;
    });
  },
  initialState,
});

export default lyricSlice.reducer;
