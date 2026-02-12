import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:null,
  user: null,
  loading: false,
  error: null,
  signupData: null, // for OTP flow only
  verifyEmail: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },

    setToken(state,action){
      state.loading = action.payload
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
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
  setVerifyEmail,
  setIsAuthenticated,
  setToken
} = authSlice.actions;

export default authSlice.reducer;
