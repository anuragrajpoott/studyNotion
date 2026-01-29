const express = require("express");
const router = express.Router();

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

const { auth, isInstructor } = require("../middleware/auth");

router.post("/", auth, isInstructor, createSection);
router.put("/:sectionId", auth, isInstructor, updateSection);
router.delete("/:sectionId", auth, isInstructor, deleteSection);

module.exports = router;
