const express = require("express");
const router = express.Router();

const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/categoryController");

const { auth, isAdmin } = require("../middleware/auth");

// admin only
router.post("/create", auth, isAdmin, createCategory);

// public
router.get("/all", showAllCategories);
router.post("/page-details", categoryPageDetails);

module.exports = router;
