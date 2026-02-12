const express = require("express");
const router = express.Router();

const {
  enrollCartCourses,
  getMyEnrolledCourses,
  getEnrolledCourseContent,
  enrollCourse
} = require("../controllers/enrollmentController");

const { auth, isStudent } = require("../middleware/auth");

// student
router.post("/enroll", auth, isStudent, enrollCartCourses);
router.post("/enroll/:courseId", auth, isStudent, enrollCartCourses);
router.get("/my-courses", auth, isStudent, getMyEnrolledCourses);
router.get("/:courseId",auth,isStudent,getEnrolledCourseContent);

module.exports = router;
