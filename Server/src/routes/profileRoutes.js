const express = require("express");
const router = express.Router();

const {
  updateProfile,
  updateDisplayPicture,
  getLoggedInUser,
  deleteAccount,
} = require("../controllers/profileController");

const { auth } = require("../middleware/auth");

router.get("/me", auth, getLoggedInUser);
router.put("/me/profile", auth, updateProfile);
router.put("/me/profile-image", auth, updateDisplayPicture);
router.delete("/me", auth, deleteAccount);

module.exports = router;
