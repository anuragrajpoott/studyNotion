import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],        // all categories
  categoryCourses: [],   // courses under a selected category
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryLoading(state, action) {
      state.loading = action.payload;
    },

    setCategories(state, action) {
      state.categories = action.payload;
      state.error = null;
    },

    setCategoryCourses(state, action) {
      state.categoryCourses = action.payload;
      state.error = null;
    },

    setCategoryError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearCategoryCourses(state) {
      state.categoryCourses = [];
    },

    resetCategoryState() {
      return initialState;
    },
  },
});

export const {
  setCategoryLoading,
  setCategories,
  setCategoryCourses,
  setCategoryError,
  clearCategoryCourses,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;
