import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginResponse } from '../../services/auth';
import { getUserInfo } from './authActions';

interface SliceState {
  user: AuthUser | null;
}

const initialState: SliceState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
