import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subsections: [],
  loading: false,
  error: null,
};

const subsectionSlice = createSlice({
  name: "subsection",
  initialState,
  reducers: {
    setSubsectionLoading(state, action) {
      state.loading = action.payload;
    },

    setSubsections(state, action) {
      state.subsections = action.payload;
      state.error = null;
    },

    addSubsection(state, action) {
      state.subsections.push(action.payload);
    },

    updateSubsection(state, action) {
      const updated = action.payload;
      state.subsections = state.subsections.map((sub) =>
        sub._id === updated._id ? updated : sub
      );
    },

    removeSubsection(state, action) {
      const subsectionId = action.payload;
      state.subsections = state.subsections.filter(
        (sub) => sub._id !== subsectionId
      );
    },

    setSubsectionError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearSubsections(state) {
      state.subsections = [];
      state.error = null;
    },
  },
});

export const {
  setSubsectionLoading,
  setSubsections,
  addSubsection,
  updateSubsection,
  removeSubsection,
  setSubsectionError,
  clearSubsections,
} = subsectionSlice.actions;

export default subsectionSlice.reducer;
