const express = require("express");
const router = express.Router();

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSectionController");

const { auth, isInstructor } = require("../middleware/auth");

router.post("/", auth, isInstructor, createSubSection);
router.put("/:subSectionId", auth, isInstructor, updateSubSection);
router.delete("/:subSectionId", auth, isInstructor, deleteSubSection);

module.exports = router;
