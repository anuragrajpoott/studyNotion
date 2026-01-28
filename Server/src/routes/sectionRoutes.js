const express = require("express");
const router = express.Router();

const {
  createSection,
  updateSection,
  deleteSection,
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Section");

const { auth, isInstructor } = require("../middlewares/auth");

// SECTION
router.post("/create-section", auth, isInstructor, createSection);
router.put("/update-section", auth, isInstructor, updateSection);
router.delete("/delete-section", auth, isInstructor, deleteSection);

// SUBSECTION
router.post("/create-subsection", auth, isInstructor, createSubSection);
router.put("/update-subsection", auth, isInstructor, updateSubSection);
router.delete("/delete-subsection", auth, isInstructor, deleteSubSection);

module.exports = router;
