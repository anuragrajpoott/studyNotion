import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  loading: false,
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSectionLoading(state, action) {
      state.loading = action.payload;
    },

    setSections(state, action) {
      state.sections = action.payload;
      state.error = null;
    },

    addSection(state, action) {
      state.sections.push(action.payload);
    },

    updateSection(state, action) {
      const updated = action.payload;
      state.sections = state.sections.map((section) =>
        section._id === updated._id ? updated : section
      );
    },

    removeSection(state, action) {
      const sectionId = action.payload;
      state.sections = state.sections.filter(
        (section) => section._id !== sectionId
      );
    },

    setSectionError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearSections(state) {
      state.sections = [];
      state.error = null;
    },
  },
});

export const {
  setSectionLoading,
  setSections,
  addSection,
  updateSection,
  removeSection,
  setSectionError,
  clearSections,
} = sectionSlice.actions;

export default sectionSlice.reducer;
