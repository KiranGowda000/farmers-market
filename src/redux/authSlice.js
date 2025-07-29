 // src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { loggedIn: false, role: null },
  reducers: {
    loginFarmer: (state) => {
      state.loggedIn = true;
      state.role = 'farmer';
    },
    loginConsumer: (state) => {
      state.loggedIn = true;
      state.role = 'consumer';
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = null;
    },
  },
});

export const { loginFarmer, loginConsumer, logout } = authSlice.actions;
export default authSlice.reducer;
