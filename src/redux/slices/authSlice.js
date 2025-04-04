import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    token: null,
    auth_token_expiry: null,
    avatar: null,
  },
  reducers: {
    loginFinished(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
    },

    logoutFinished(state) {
      state.currentUser = {};
      state.avatar = null;

      state.token = null;
    },
    addAvatar(state, action) {
      state.avatar = action.payload;
    },
    setFirstTime(state) {
      state.currentUser.user.firstTime = false;
    },
  },
});

export const {
  // registerStarted,
  // registerFinished,
  // registerError,
  // loginStarted,
  loginFinished,
  // persistCredential,
  // loginError,
  // logoutStarted,
  logoutFinished,
  // logoutError,
  addAvatar,
  setFirstTime,
  // persistAppToken,
  // setAuthTokenExpiry,
  // setRefreshedToken,
} = authSlice.actions;

export default authSlice.reducer;
