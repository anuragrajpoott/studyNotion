import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/apiConnector";
import { courseEndpoints } from "../apis";
import {
  setCourseLoading,
  setCourseDetails,
  setInstructorCourses,
  setCourseError,
} from "../../store/slices/courseSlice";
import mockCategoryPageData from "../../assets/data/mockCategoryPageData";


/* =========================================================
   GET COURSE DETAILS (PUBLIC)
========================================================= */
export const getCourseDetails = (courseId) => async (dispatch) => {
  dispatch(setCourseLoading(true));

  try {
    const res = await apiConnector({
      method: "GET",
      url: courseEndpoints.GET_COURSE_DETAILS(courseId),
    });

    if (!res?.data?.success) {
      
      throw new Error(res?.data?.message || "Failed to fetch course");
    }

    dispatch(setCourseDetails(res.data.data));

  } catch (err) {
    dispatch(setCourseError(err.message));
  } finally {
    dispatch(setCourseLoading(false));
  }
};



/* =========================================================
   GET INSTRUCTOR COURSES
========================================================= */
export const getInstructorCourses = () => async (dispatch) => {
  dispatch(setCourseLoading(true));
  try {
    const res = await apiConnector({
      method: "GET",
      url: courseEndpoints.GET_INSTRUCTOR_COURSES,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setInstructorCourses(res.data.data));
  } catch (err) {
    dispatch(setCourseError(err.message));
    toast.error("Failed to load instructor courses");
  } finally {
    dispatch(setCourseLoading(false));
  }
};

/* =========================================================
   CREATE COURSE (INSTRUCTOR)
========================================================= */
export const createCourse = (formData, navigate) => async (dispatch) => {
  dispatch(setCourseLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: courseEndpoints.CREATE_COURSE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Course created successfully");
    navigate("/dashboard/my-courses");
  } catch (err) {
    dispatch(setCourseError(err.message));
    toast.error("Failed to create course");
  } finally {
    dispatch(setCourseLoading(false));
  }
};

/* =========================================================
   EDIT COURSE (INSTRUCTOR)
========================================================= */
export const editCourse = (formData, navigate) => async (dispatch) => {
  dispatch(setCourseLoading(true));
  try {
    const res = await apiConnector({
      method: "PUT",
      url: courseEndpoints.EDIT_COURSE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Course updated successfully");
    navigate("/dashboard/my-courses");
  } catch (err) {
    dispatch(setCourseError(err.message));
    toast.error("Failed to update course");
  } finally {
    dispatch(setCourseLoading(false));
  }
};

/* =========================================================
   DELETE COURSE (INSTRUCTOR)
========================================================= */
export const deleteCourse = (courseId) => async (dispatch) => {
  dispatch(setCourseLoading(true));
  try {
    const res = await apiConnector({
      method: "DELETE",
      url: courseEndpoints.DELETE_COURSE,
      data: { courseId },
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Course deleted");
    dispatch(getInstructorCourses());
  } catch (err) {
    dispatch(setCourseError(err.message));
    toast.error("Failed to delete course");
  } finally {
    dispatch(setCourseLoading(false));
  }
};
