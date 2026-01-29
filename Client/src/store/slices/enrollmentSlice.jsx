import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],   // courses user has access to
  activeCourse: null,    // currently viewed enrolled course
  loading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollmentLoading(state, action) {
      state.loading = action.payload;
    },

    setEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload;
      state.error = null;
    },

    setActiveCourse(state, action) {
      state.activeCourse = action.payload;
      state.error = null;
    },

    clearActiveCourse(state) {
      state.activeCourse = null;
    },

    setEnrollmentError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    resetEnrollmentState() {
      return initialState;
    },
  },
});

export const {
  setEnrollmentLoading,
  setEnrolledCourses,
  setActiveCourse,
  clearActiveCourse,
  setEnrollmentError,
  resetEnrollmentState,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
