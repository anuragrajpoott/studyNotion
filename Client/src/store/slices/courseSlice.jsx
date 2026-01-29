import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],            // public courses
  courseDetails: null,    // selected course (public)
  instructorCourses: [], // instructor-owned courses
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseLoading(state, action) {
      state.loading = action.payload;
    },

    setCourses(state, action) {
      state.courses = action.payload;
      state.error = null;
    },

    setCourseDetails(state, action) {
      state.courseDetails = action.payload;
      state.error = null;
    },

    setInstructorCourses(state, action) {
      state.instructorCourses = action.payload;
      state.error = null;
    },

    clearCourseDetails(state) {
      state.courseDetails = null;
    },

    setCourseError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    resetCourseState() {
      return initialState;
    },
  },
});

export const {
  setCourseLoading,
  setCourses,
  setCourseDetails,
  setInstructorCourses,
  clearCourseDetails,
  setCourseError,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
