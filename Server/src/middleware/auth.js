const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/* =========================================================
   AUTH MIDDLEWARE
========================================================= */
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user info from token
      req.user = {
        id: decoded.id,
        email: decoded.email,
        accountType: decoded.role || decoded.accountType,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

/* =========================================================
   ROLE-BASED MIDDLEWARES
========================================================= */

exports.isStudent = (req, res, next) => {
  if (req.user.accountType !== "Student") {
    return res.status(403).json({
      success: false,
      message: "This route is protected for students only",
    });
  }
  next();
};

exports.isInstructor = (req, res, next) => {
  if (req.user.accountType !== "Instructor") {
    return res.status(403).json({
      success: false,
      message: "This route is protected for instructors only",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.accountType !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "This route is protected for admins only",
    });
  }
  next();
};
