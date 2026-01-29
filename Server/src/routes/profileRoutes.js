const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/profileController");

const { auth, isInstructor } = require("../middleware/auth");

router.put("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);
router.get("/get-user-details", auth, getAllUserDetails);
router.put("/update-display-picture", auth, updateDisplayPicture);

// student
router.get("/enrolled-courses", auth, getEnrolledCourses);

// instructor
router.get("/instructor-dashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
