const express = require("express");
const router = express.Router();

const {
  sendotp,
  signup,
  login,
  changePassword,
  resetPasswordToken,
  resetPassword,
} = require("../controllers/authController");

const { auth } = require("../middleware/auth");

// signup flow
router.post("/send-otp", sendotp);
router.post("/signup", signup);

// auth
router.post("/login", login);
router.post("/change-password", auth, changePassword);

// password reset
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
