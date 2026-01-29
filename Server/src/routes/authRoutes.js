const express = require("express");
const router = express.Router();

const {
  sendOtp,
  signup,
  login,
  changePassword,
} = require("../controllers/authController");

const { auth } = require("../middleware/auth");

// OTP & signup
router.post("/send-otp", sendOtp);
router.post("/signup", signup);

// auth
router.post("/login", login);
router.post("/change-password", auth, changePassword);


module.exports = router;
