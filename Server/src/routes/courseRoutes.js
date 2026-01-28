const express = require("express");
const router = express.Router();

const {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

const { auth, isInstructor } = require("../middlewares/auth");

// instructor
router.post("/create", auth, isInstructor, createCourse);
router.put("/edit", auth, isInstructor, editCourse);
router.get("/instructor-courses", auth, isInstructor, getInstructorCourses);
router.delete("/delete", auth, isInstructor, deleteCourse);

// public
router.get("/all", getAllCourses);
router.post("/details", getCourseDetails);

// enrolled user
router.post("/full-details", auth, getFullCourseDetails);

module.exports = router;
