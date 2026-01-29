import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileLoading(state, action) {
      state.loading = action.payload;
    },

    setProfile(state, action) {
      state.profile = action.payload;
      state.error = null;
    },

    setProfileError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  setProfileLoading,
  setProfile,
  setProfileError,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
