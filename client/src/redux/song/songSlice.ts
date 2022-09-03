import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../services/song';
import { getFavouriteSong, getUploadedSong, uploadSong } from './songActions';

interface SliceState {
  uploaded: {
    data: Song[];
  };
  favourite: {
    data: Song[];
  };
}

const initialState: SliceState = {
  uploaded: {
    data: [],
  },
  favourite: {
    data: [],
  },
};

const songSlice = createSlice({
  name: 'songs',
  reducers: {
    //  changeFavourite(state, action: PayloadAction<string>) {
    //      state.favourite.data = state.favourite.data.map(song => {
    //        if(song.id === action.payload) {
    //           return {...song, is_liked: !song.is_liked}
    //        } else {
    //          return song;
    //        }
    //      })
    //      state.uploaded.data = state.uploaded.data.map(song => {
    //        if(song.id === action.payload) {
    //           return {...song, is_liked: !song.is_liked}
    //        } else {
    //          return song;
    //        }
    //      })
    //  }

    editSongSucess(state, action: PayloadAction<{ song: Song }>) {
      state.uploaded.data = state.uploaded.data.map((song) => {
        if (song.id === action.payload.song.id) {
          return action.payload.song;
        } else {
          return song;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUploadedSong.fulfilled, (state, action) => {
        state.uploaded.data = action.payload.songs;
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.uploaded.data.unshift(action.payload.song);
        state.favourite.data.unshift(action.payload.song);
      })
      .addCase(getFavouriteSong.fulfilled, (state, action) => {
        state.favourite.data = action.payload.songs;
      });
  },
  initialState,
});

export const { editSongSucess } = songSlice.actions;
export default songSlice.reducer;
