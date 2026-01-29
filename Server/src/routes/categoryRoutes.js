const express = require("express");
const router = express.Router();

const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/categoryController");

const { auth, isAdmin } = require("../middleware/auth");

// admin
router.post("/", auth, isAdmin, createCategory);

// public
router.get("/", showAllCategories);
router.get("/:categoryId", categoryPageDetails);

module.exports = router;
