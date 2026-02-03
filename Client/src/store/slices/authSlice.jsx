import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  signupData: null, // for OTP flow only
  verifyEmail: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },

    setVerifyEmail(state, action) {
      state.verifyEmail = action.payload;
    },

    clearUser(state) {
      state.user = null;
    },

    setAuthError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    clearSignupData(state) {
      state.signupData = null;
    },
  },
});

export const {
  setAuthLoading,
  setUser,
  clearUser,
  setAuthError,
  setSignupData,
  clearSignupData,
  setVerifyEmail
} = authSlice.actions;

export default authSlice.reducer;
