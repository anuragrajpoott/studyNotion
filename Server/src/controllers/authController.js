const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/Otp");

const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

/* =========================================================
   SEND OTP (Signup)
========================================================= */
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

/* =========================================================
   SIGNUP
========================================================= */
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const latestOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp || latestOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({});

    const image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%${lastName}`;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      approved: accountType === "Instructor" ? false : true,
      additionalDetails: profile._id,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

/* =========================================================
   LOGIN
========================================================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

/* =========================================================
   CHANGE PASSWORD
========================================================= */
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await mailSender(
      user.email,
      "Password Updated",
      passwordUpdated(
        user.email,
        `Password updated for ${user.firstName} ${user.lastName}`
      )
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password update failed",
      error: error.message,
    });
  }
};

/* =========================================================
   RESET PASSWORD TOKEN
========================================================= */
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Click this link to reset your password: ${resetUrl}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password email sent",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reset token generation failed",
      error: error.message,
    });
  }
};

/* =========================================================
   RESET PASSWORD
========================================================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ token });
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token invalid or expired",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.token = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password reset failed",
      error: error.message,
    });
  }
};
