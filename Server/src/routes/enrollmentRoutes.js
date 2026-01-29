const express = require("express");
const router = express.Router();

const {
  enrollInCourse,
  getMyEnrolledCourses,
  getEnrolledCourseContent,
} = require("../controllers/enrollmentController");

const { auth, isStudent } = require("../middleware/auth");

// student
router.post("/enroll", auth, isStudent, enrollInCourse);
router.get("/my-courses", auth, isStudent, getMyEnrolledCourses);
router.get(
  "/course/:courseId",
  auth,
  isStudent,
  getEnrolledCourseContent
);

module.exports = router;
