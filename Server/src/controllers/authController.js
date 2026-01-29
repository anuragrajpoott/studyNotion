const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const emailVerificationTemplate = require("../mailTemplates/emailVerificationEmail");

const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/Otp");
const mailSender = require("../config/mailSender");

require("dotenv").config();

/* =========================================================
   SEND OTP (EMAIL VERIFICATION / PASSWORD RESET)
========================================================= */
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email and purpose are required",
      });
    }

    let user = await User.findOne({ email });

    // For signup, user must NOT exist
    if ( user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpHash = await bcrypt.hash(otp, 10);

    await OTP.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    await mailSender(
      email,
      " OTP for Email Verification",
      emailVerificationTemplate(otp)
    );

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
   SIGNUP (OTP VERIFIED)
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

    const otpRecord = await OTP.findOne({
      email: email,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).select("+otpHash").sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or invalid",
      });
    }

    const isOtpValid = await bcrypt.compare(otp, otpRecord.otpHash);
    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpRecord.isUsed = true;
    await otpRecord.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = await Profile.create({});

     const newUser = await User.create({
  firstName,
  lastName,
  email,
  password: hashedPassword,
  accountType: accountType || "Student",
  profile: profile._id,
});

 const token = jwt.sign(
      {
        id: newUser._id,
        accountType: newUser.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    newUser.password = undefined;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      newUser,
      token,
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
      .populate("profile");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
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
      {
        id: user._id,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    user.password = undefined;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user,
      token,
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
   CHANGE PASSWORD (LOGGED IN)
========================================================= */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

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

