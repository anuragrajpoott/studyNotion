const jwt = require("jsonwebtoken");
require("dotenv").config();

/* =========================================================
   AUTHENTICATION MIDDLEWARE
========================================================= */
exports.auth = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user info to request
    req.user = {
      id: decoded.id,
      accountType: decoded.accountType,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/* =========================================================
   ROLE-BASED ACCESS CONTROL (RBAC)
========================================================= */

exports.isStudent = (req, res, next) => {
  if (req.user.accountType !== "Student") {
    return res.status(403).json({
      success: false,
      message: "Access restricted to students only",
    });
  }
  next();
};

exports.isInstructor = (req, res, next) => {
  if (req.user.accountType !== "Instructor") {
    return res.status(403).json({
      success: false,
      message: "Access restricted to instructors only",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.accountType !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Access restricted to admins only",
    });
  }
  next();
};
