import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { enrollmentEndpoints } from "../endpoints";
import {
  setEnrollmentLoading,
  setEnrolledCourses,
  setActiveCourse,
  setEnrollmentError,
} from "../../store/slices/enrollmentSlice";

/* =========================================================
   CHECKOUT CART → ENROLL IN COURSES
========================================================= */
export const checkoutCart =
  (courseIds, navigate) => async (dispatch) => {
    dispatch(setEnrollmentLoading(true));
    try {
      const res = await apiConnector({
        method: "POST",
        url: enrollmentEndpoints.CHECKOUT_CART,
        data: { courseIds },
      });

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Enrolled successfully");
      navigate("/dashboard/enrolled-courses");
    } catch (err) {
      dispatch(setEnrollmentError(err.message));
      toast.error("Enrollment failed");
    } finally {
      dispatch(setEnrollmentLoading(false));
    }
  };

/* =========================================================
   GET MY ENROLLED COURSES (STUDENT DASHBOARD)
========================================================= */
export const getMyEnrolledCourses = () => async (dispatch) => {
  dispatch(setEnrollmentLoading(true));
  try {
    const res = await apiConnector({
      method: "GET",
      url: enrollmentEndpoints.GET_MY_ENROLLED_COURSES,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setEnrolledCourses(res.data.data));
  } catch (err) {
    dispatch(setEnrollmentError(err.message));
    toast.error("Failed to load enrolled courses");
  } finally {
    dispatch(setEnrollmentLoading(false));
  }
};

/* =========================================================
   SET ACTIVE ENROLLED COURSE (LOCAL STATE)
========================================================= */
export const selectEnrolledCourse =
  (course) => (dispatch) => {
    dispatch(setActiveCourse(course));
  };
