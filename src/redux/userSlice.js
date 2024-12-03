import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isAuthenticated: false
  },
  reducers: {
    login: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
