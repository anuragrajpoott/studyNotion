const express = require("express");
const router = express.Router();

const {
  createCourse,
  editCourse,
  deleteCourse,
  getCourseDetails,
  getInstructorCourses,
} = require("../controllers/courseController");

const { auth, isInstructor } = require("../middleware/auth");

// instructor
router.post("/", auth, isInstructor, createCourse);
router.put("/:courseId", auth, isInstructor, editCourse);
router.delete("/:courseId", auth, isInstructor, deleteCourse);
router.get("/instructor", auth, isInstructor, getInstructorCourses);

// public
router.get("/:courseId", getCourseDetails);

module.exports = router;
