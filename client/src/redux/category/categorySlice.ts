import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../services/category';
import { getAllCategoriesActions } from './categoryActions';

interface SliceState {
  all: Category[];
}

const initialState: SliceState = {
  all: [],
};

const categorySlice = createSlice({
  name: 'category',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCategoriesActions.fulfilled, (state, action) => {
      state.all = action.payload.categories;
    });
  },
  initialState,
});

export default categorySlice.reducer;
